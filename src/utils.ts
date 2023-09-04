

import * as vscode from 'vscode';

async function _fileExist(fs: vscode.FileSystem, filePath: string): Promise<boolean> {
    try {
        let result = await fs.stat(vscode.Uri.parse(filePath));
        if (result) {
            if (result.type === vscode.FileType.File) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

async function _folderExists(fs: vscode.FileSystem, path: string) {
    try {
        return (await fs.stat(vscode.Uri.parse(path))).type === vscode.FileType.Directory;
    } catch (error) {
        return false; // 文件夹不存在
    }
}

function _isPascalCase(inputString: string): boolean {
    // 使用正则表达式检查是否符合帕斯卡命名规则
    // 首字母必须大写，后续字母不能是大写，且不包含空格或特殊字符
    const pascalCasePattern = /^[A-Z][a-zA-Z]*$/;

    return pascalCasePattern.test(inputString);
}

export var isPascalCase = _isPascalCase;

export var dictExist = _folderExists;
export var fileExist = _fileExist;