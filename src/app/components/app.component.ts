import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private msalService = inject(MsalService);
  private msalBroadcastService = inject(MsalBroadcastService);

  // Use a signal for title
  readonly title = signal('angular-webapp-template');

  // Use a signal to track interaction status
  readonly interactionStatus = signal<InteractionStatus | null>(null);

  constructor() {
    this.msalBroadcastService.inProgress$
      .pipe(filter((status: InteractionStatus) => status === InteractionStatus.None))
      .subscribe(() => {
        this.checkAndSetActiveAccount();
        this.interactionStatus.set(InteractionStatus.None);
      });
  }

  checkAndSetActiveAccount() {
    const activeAccount = this.msalService.instance.getActiveAccount();
    if (!activeAccount && this.msalService.instance.getAllAccounts().length > 0) {
      const accounts = this.msalService.instance.getAllAccounts();
      this.msalService.instance.setActiveAccount(accounts[0]);
    }
  }
}
