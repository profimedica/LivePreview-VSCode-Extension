import vscode = require( 'vscode' );
import fs = require( 'fs' );
import { TextDocument } from 'vscode';
import * as path from 'path';

export class LivePreview {

    private DEBUG = true;

    constructor(private context: vscode.ExtensionContext) {
        console.log('AJP - Registring live preview commands ...');
		context.subscriptions.push(
            vscode.commands.registerCommand( 'livePreview.updateLivePreview', (document: TextDocument) => {
                    this.updateLivePreview( document );
			})
        );
	}

    public updateLivePreview(document: TextDocument)
    {
        let outputPath = vscode.workspace.getConfiguration('livePreview').mainBundleJsPath;
        if(document.fileName.indexOf('\\src\\') < 0)
        {
            return;
        }
        else
        {
            outputPath = document.fileName.substring(0, document.fileName.indexOf('\\src\\')+5) + outputPath;
        }

        if(!fs.existsSync(outputPath)) {
            console.log('Live Preview: ' + outputPath);
            const msg = 'main.bundle.js was not found. Try to build your app or configure mainBundleJsPath of Live Preview extension.';
            if(this.DEBUG) {
                vscode.window.showInformationMessage(msg);
            }
            console.log(msg);
            return;
        }
        let content = document.getText();
        let mainjs = fs.readFileSync(outputPath, 'UTF-8');
        const pathMarker = document.fileName.substring(document.fileName.indexOf('\\src\\') + 5);

        mainjs = this.updateHTML(mainjs, content, pathMarker);

        fs.writeFile(outputPath, mainjs, { flag: 'w' }, function (err) {
            if (err) 
            {
                throw err;
            }
            if(!outputPath)
            {
                console.log('Live Preview updated: ' + outputPath );
            }
        });
    }

    updateHTML(originalContent: string, newContent: string, pathMarker: string): string {
        let pathMarkerIndex = originalContent.indexOf(pathMarker.replace(/\\/g, "/") + "\":") + pathMarker.length;
        const secondMarker = 'module.exports = "';
        pathMarkerIndex = originalContent.indexOf(secondMarker, pathMarkerIndex) + secondMarker.length;
        return originalContent.substring(0, pathMarkerIndex) + newContent.replace(/\r\n/g, "\\n").replace(/"/g, "\\\"") + originalContent.substring(originalContent.indexOf('"\n', pathMarkerIndex));
    }
    
    deactivate()
    {
    }

    activate(context: vscode.ExtensionContext)
    {
    }
}
