import * as vscode from 'vscode';
import { dictExist, fileExist, isPascalCase } from './utils';
import { generateComponent, generateList, hump2Underline } from './generator';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "getx-ext-temp-gen" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand(
		"getx-ext-temp-gen.temp-page", async (args) => {
			gen(args.path, generateComponent, true);

		}
	));
	context.subscriptions.push(vscode.commands.registerCommand(
		"getx-ext-temp-gen.temp-list", async (args) => {
			gen(args.path, generateList, true);
		}
	));
	context.subscriptions.push(vscode.commands.registerCommand(
		"getx-ext-temp-gen.temp-component", async (args) => {
			gen(args.path, generateComponent, false);
		}
	));
	context.subscriptions.push(vscode.commands.registerCommand(
		"getx-ext-temp-gen.temp-list-component", async (args) => {
			gen(args.path, generateList, false);
		}
	));




}

// This method is called when your extension is deactivated
export function deactivate() { }


//检查当前文件夹即父文件夹是否存在pubspec.lock文件,且其中包含tl_getx的依赖
async function checkPubspec(fs: vscode.FileSystem, psiPath: string): Promise<boolean> {
	//判断当前路径是否存在pubspec.lock文件
	if (psiPath.charAt(psiPath.length - 1) === '/') {
		psiPath = psiPath.substring(0, psiPath.length - 1);
	}
	let pubspecLockPath = `${psiPath}/pubspec.lock`;
	console.log(pubspecLockPath);
	let exist = await fileExist(fs, pubspecLockPath);
	if (exist) {
		//存在pubspec.lock文件
		//读取文件内容,判断是否存在tl_getx依赖
		let content = await fs.readFile(vscode.Uri.parse(pubspecLockPath));
		let str = content.toString();
		if (str.indexOf('tl_getx:') !== -1) {
			return true;
		} else {
			vscode.window.showErrorMessage("当前项目未引入tl_getx依赖");
			return false;
		}

	} else {
		//不存在pubspec.lock文件
		//向上找一级
		let parentPath = _removeLastPath(psiPath);
		console.log(parentPath);
		if (parentPath) {
			return await checkPubspec(fs, parentPath);
		} else {
			vscode.window.showErrorMessage("未找到pubspec.lock文件");
			return false;
		}
	}

	return false;
}

//将路径去除一级
function _removeLastPath(path: string): string | undefined {
	
	if (path.charAt(path.length - 1) === '/') {
		path = path.substring(0, path.length - 1);
	}
	if(path.charAt(path.length - 1) === ':'){
		return undefined;
	}

	let index = path.lastIndexOf('/');
	if (index === -1) {
		return;
	}
	return path.substring(0, index + 1);
}



async function gen(psiPath: string, generator: Function, needBinding: boolean) {
	let fs = await checkPubspec(vscode.workspace.fs, psiPath);
	if (fs) {
		let text = await vscode.window.showInputBox({
			placeHolder: "输入模块名称,例如TestPage"
		}
		);
		if (text) {
			if (isPascalCase(text)) {
				let fs = vscode.workspace.fs;
				let name = hump2Underline(text);
				let dict = `${psiPath}/${name}`;
				let exist = await dictExist(fs, dict);
				if (exist) {
					console.log('文件夹已存在');
					vscode.window.showErrorMessage("文件夹已存在");
				} else {
					//创建文件夹
					await fs.createDirectory(vscode.Uri.parse(dict));
					await generator(fs, psiPath, text, needBinding);
					vscode.window.showInformationMessage("创建完成");
				}
			} else {
				vscode.window.showErrorMessage("模块非帕斯卡命名");
			}

		}
	}
}


export var removeLastPath = _removeLastPath;