import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-landing-page',
    template: `<h1>Welcome to the Landing Page</h1>`,
    styleUrl: './landing-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {}
