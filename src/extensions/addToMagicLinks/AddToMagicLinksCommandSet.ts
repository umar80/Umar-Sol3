import { Guid } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'AddToMagicLinksCommandSetStrings';


/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAddToMagicLinksCommandSetProperties {
  // This is an example; replace with your own properties
  targetUrl: string;
}

const LOG_SOURCE: string = 'AddToMagicLinksCommandSet';

export default class AddToMagicLinksCommandSet extends BaseListViewCommandSet<IAddToMagicLinksCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized AddToMagicLinksCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareOneCommand: Command = this.tryGetCommand('AddToMagicDocs');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = event.selectedRows && event.selectedRows.length>0;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'AddToMagicDocs':
      
      
      console.log(event);
      console.log(event.selectedRows[0]);
      const listId: Guid = this.context.pageContext.list.id;

      Dialog.alert(event.itemId);      
      event.selectedRows.forEach(element => {
        const itemId: number = element.getValueByName("ID");  
        const fileName:string =element.getValueByName("FileLeafRef");
        console.log(`updated:ID=${itemId}&List=${listId}&Title=${fileName}`);
      });
      
      //window.location.replace('${this.properties.targetUrl}?ID=${itemId}&List=${listId}');
      
        break;      
      default:
        throw new Error('Unknown command');
    }
  }
}
