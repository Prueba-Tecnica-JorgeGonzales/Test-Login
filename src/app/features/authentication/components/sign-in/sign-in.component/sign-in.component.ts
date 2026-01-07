import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../../../shared/services/auth.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in.component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.valid) {

      // Llamamos al login
      this.authService.login(this.loginForm.value).subscribe({

        // CASO ÉXITO (Next)
        next: () => {
          console.log('Login correcto. Redirigiendo...');

          this.router.navigate(['/users']);
        },

        error: (err) => {
          console.error('Error de login:', err);
          alert('Error: Usuario o contraseña incorrectos.');
        }
      });

    } else {
      alert('Por favor completa los campos');
    }
  }
}
