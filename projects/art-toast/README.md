# Art Toast
Art Toast is an easy-to-use library.

DEMO: coming soon
## Install

    npm install art-toast
    
`font-awesome` is a necessary dependency for icons

    npm i font-awesome@4.7.0

## Setup
**1:** Add font-awesome to angular.json

    {
	    ...
	    "styles": [
		    "node_modules/font-awesome/css/font-awesome.min.css"
	    ]
    }

**2:** Add the module to app.module.ts

    import { ArtToastModule } from  'art-toast';
    
    @NgModule({
    declarations: [
	    ...
    ],
    imports: [
	    ...,
	    ArtToastModule
    ],
    providers: [...],
    })

**3:** Add in app.component.html

    <art-toast></art-toast>


## Using

	import { Component } from  '@angular/core';
	import { ArtToastService } from  'art-toast';
	
	@Component({...})
	export  class  AppComponent {
		constructor(private  artToastService: ArtToastService) { }
		showToast() {
			this.artToastService.success('title', 'description', {
			showButtonClose:  true,
			timer:  2000
			});
		}
	}

