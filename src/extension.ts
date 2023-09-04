import * as vscode from 'vscode';
import { dictExist, isPascalCase } from './utils';
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


async function gen(psiPath: string, generator: Function, needBinding: boolean) {
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
			console.log(dict);
			if (exist) {
				console.log('文件夹已存在');
				vscode.window.showErrorMessage("文件夹已存在");
			} else {
				//创建文件夹
				console.log('文件夹不存在');
				await fs.createDirectory(vscode.Uri.parse(dict));
				await generator(fs, psiPath, text, needBinding);
				vscode.window.showInformationMessage("创建完成");
			}
		} else {
			vscode.window.showErrorMessage("模块非帕斯卡命名");
		}

	}
}