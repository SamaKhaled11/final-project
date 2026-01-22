import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { NotFoundComponent } from './features/static-pages/not-found/not-found.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly spinnerService = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.spinnerService.show('atom');
    setTimeout(() => {
      this.spinnerService.hide('atom');
    }, 2000);
  }
  protected readonly title = signal('e-commerce');
}
