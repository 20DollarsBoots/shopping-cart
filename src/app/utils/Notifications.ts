import { ToastService } from 'ng-uikit-pro-standard';

export class Notifications {
 constructor(public toastrService: ToastService){}

    showError(text: string, text2?: string) {
        const options = { opacity: 1 };
        this.toastrService.error(text, text2 || '', options); 
    }

    showSuccess(text: string, text2?: string) {
        const options = { opacity: 1 };
        this.toastrService.success(text,  text2 || '', options); 
    }
    
    showAlert(text: string, text2?: string) {
        const options = { opacity: 1 };
        this.toastrService.warning(text,  text2 || '', options); 
    }
}