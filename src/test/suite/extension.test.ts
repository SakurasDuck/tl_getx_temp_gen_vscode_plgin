import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});


	test('test removeLastPath', () => {
		let path = 'D:a/b/c';
		let result = 'D:a/b/';
		assert.strictEqual(result, myExtension.removeLastPath(path));
	});

	test('test removeLastPath last char is /', () => {
		let path = 'D:a/b/c/';
		let result = 'D:a/b/';
		assert.strictEqual(result, myExtension.removeLastPath(path));
	});

	test('test removeLastPath can not remove', () => {
		let path = 'a';
		let result = undefined;
		assert.strictEqual(result, myExtension.removeLastPath(path));
	});

});
