import { ApiService } from './api';
import { Injectable } from '@angular/core';
import { StoreHelper } from './store-helper';

@Injectable()
export class NoteService {
    path: string = '/notes';
    constructor(
        private api: ApiService,
        private storeHelper: StoreHelper) {
    }

    createNote(note) {
        return this.api.postWindows(this.path, note)
            .do(savedNote => this.storeHelper.add('notes', savedNote));
    }

    getNotes() {
        return this.api.getWindows(this.path)
            .do((resp: any) => this.storeHelper.update('notes', resp.data));
    }

    //completeNote(note) {
    //    return this.api.delete(`${this.path}/${note.id}`)
    //        .do((resp: any) => this.storeHelper.findAndDelete('notes', resp.id));
    //}
}