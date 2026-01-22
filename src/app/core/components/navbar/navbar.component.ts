import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  public readonly cartService = inject(CartService);
  isMenuOpen = false;

  @Input() isLogin = false;

  logOut(): void {
    this.authService.logOut();
  }
  ngOnInit() {
    this.cartService.getCart();
  }
}
