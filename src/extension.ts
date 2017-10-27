import * as vscode from 'vscode';
import { LivePreview } from './livePreview';

export function activate(context: vscode.ExtensionContext) {

	const livePreview = new LivePreview(context);
	vscode.workspace.onDidSaveTextDocument(document=>{
		var livePreviewIsActive = vscode.workspace.getConfiguration( 'livePreview' ).on;
		if (livePreviewIsActive)
		{
			let fileExtension = '';
			if(document != undefined && document.fileName != undefined && document.fileName.lastIndexOf('.') > -1)
			{
				fileExtension = document.fileName.substring(document.fileName.lastIndexOf('.') + 1);
			}
			if((<string>vscode.workspace.getConfiguration('livePreview').liveUpdateFilesExtension).split(' ').indexOf(fileExtension) >= 0)
			{
				vscode.commands.executeCommand('livePreview.updateLivePreview', document);
			}
		}
	});
}