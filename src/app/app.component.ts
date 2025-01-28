import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';

@Component({
    selector: 'app-root',
    imports: [
      RouterOutlet,
      HeaderComponent,
      SidebarComponent,
      ContentComponent,
      FooterComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true
})
export class AppComponent {

}
