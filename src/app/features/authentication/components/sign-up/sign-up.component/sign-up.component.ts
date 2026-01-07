import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-sign-up.component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // 4. Definición del Formulario
  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.registerForm.valid) {

      const userData = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: () => {
          alert('¡Cuenta creada con éxito! Ahora inicia sesión.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error en registro:', err);
          alert('Error al registrarse: ' + (err.error?.message || 'Intenta con otro usuario o email'));
        }
      });
    } else {
      alert('Por favor completa el formulario correctamente');
    }
  }

}
