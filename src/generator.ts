
import * as vscode from 'vscode';
import { fileExist } from './utils';
import { componentBinding } from './temps/component/binding';
import { list } from './temps/list/main';
import { listBinding } from './temps/list/binding';
import { listLogic } from './temps/list/logic';
import { listView } from './temps/list/view';
import { listState } from './temps/list/state';
import { itemState } from './temps/list/item/state';
import { itemLogic } from './temps/list/item/logic';
import { itemBinding } from './temps/list/item/binding';
import { itemView } from './temps/list/item/view';
import { component } from './temps/component/main';
import { componentLogic } from './temps/component/logic';
import { componentView } from './temps/component/view';
import { componentState } from './temps/component/state';

/// 大驼峰转下横线
function _hump2Underline(para: String):string {
  let newString = "";
  if (!para.includes("_")) {
    for (let i = 0; i < para.length; i++) {
      if (charIsUpperCase(para[i])) {
        newString += "_" + para[i].toLowerCase();
      } else {
        newString += para[i];
      }
    }
  }
  if (newString[0] === '_') {
    return newString.substring(1);
  } else {
    return newString;
  }
}

///判断是否是大写
function charIsUpperCase(c: String) {
  return c === c.toUpperCase();
}
async function _generateList(fs: vscode.FileSystem, psiPath: string, name: string, needBinding: boolean) {
  let futures: Promise<void>[] = [];
  let subPackage: string = _hump2Underline(name);

  futures.push(
    _generateFile(fs, list(name, subPackage), `${psiPath}/${subPackage}`, `${subPackage}.dart`, needBinding));
  if (needBinding) {
    futures.push(
      _generateFile(fs, listBinding(name, subPackage), `${psiPath}/${subPackage}`, 'binding.dart', needBinding));
  }
  futures
    .push(_generateFile(fs, listLogic(name, subPackage), `${psiPath}/${subPackage}`, 'logic.dart', needBinding));
  futures.push(_generateFile(fs, listView(name, subPackage), `${psiPath}/${subPackage}`, 'view.dart', needBinding));
  futures
    .push(_generateFile(fs, listState(name, subPackage), `${psiPath}/${subPackage}`, 'state.dart', needBinding));
  futures.push(_generateFile(fs, itemState(name, subPackage),
    `${psiPath}/${subPackage}/${subPackage}_item`, 'state.dart', needBinding));
  futures.push(_generateFile(fs, itemLogic(name, subPackage),
    `${psiPath}/${subPackage}/${subPackage}_item`, 'logic.dart', needBinding));
  futures.push(_generateFile(fs,
    itemView(name, subPackage), `${psiPath}/${subPackage}/${subPackage}_item`, 'view.dart', needBinding));
  futures.push(_generateFile(fs, itemBinding(name, subPackage),
    `${psiPath}/${subPackage}/${subPackage}_item`, 'binding.dart', needBinding));
  await Promise.all(futures);
}



async function _generateComponent(fs: vscode.FileSystem, psiPath: string, name: string, needBinding: boolean): Promise<void> {
  try {
    let futures: Promise<void>[] = [];
    let subPackage: string = _hump2Underline(name);
    if (needBinding) {
      futures.push(_generateFile(fs,
        componentBinding(name, subPackage), `${psiPath}/${subPackage}`, 'binding.dart', needBinding));
    }
    futures.push(_generateFile(fs,
      component(name, subPackage), `${psiPath}/${subPackage}`, `${subPackage}.dart`, needBinding));
    futures.push(
      _generateFile(fs, componentLogic(name, subPackage), `${psiPath}/${subPackage}`, 'logic.dart', needBinding));
    futures.push(
      _generateFile(fs, componentView(name, subPackage), `${psiPath}/${subPackage}`, 'view.dart', needBinding));
    futures.push(
      _generateFile(fs, componentState(name, subPackage), `${psiPath}/${subPackage}`, 'state.dart', needBinding));
    try {
      await Promise.all(futures);
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
}


async function _generateFile(fs: vscode.FileSystem, content: string, filePath: string, fileName: string, needBinding: boolean) {
  content = _dealFile(content, needBinding);
  await _write2File(fs, content, filePath, fileName);
}

function _dealFile(content: string, needBinding: boolean) {
  if (!needBinding) {
    content = content.replace("export 'binding.dart';", '');
  }
  return content;
}
function stringToUint8Array(inputString: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(inputString);
}

async function _write2File(fs: vscode.FileSystem,
  content: string, filePath: string, filename: string) {
  try {
    let file = filePath + "/" + filename;
    let exist = await fileExist(fs, file);

    if (exist) {
      vscode.window.showErrorMessage(filename + "文件已存在!!!");
    } else {
      await fs.writeFile(vscode.Uri.parse(file), stringToUint8Array(content));
    }

  } catch (e) {
    console.log(e);
  }
}


export var generateComponent = _generateComponent;
export var generateList = _generateList;
export var hump2Underline = _hump2Underline;