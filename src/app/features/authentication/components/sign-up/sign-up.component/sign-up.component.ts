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
      const passwordControl = this.registerForm.get('password');

      // Preguntamos: ¿Tiene el error de longitud mínima?
      if (passwordControl?.hasError('minlength')) {
        alert('La contraseña tiene que ser mayor a 6 dígitos');
      }
      // Preguntamos: ¿Está vacío?
      else if (passwordControl?.hasError('required')) {
        alert('Todos los campos son obligatorios');
      }
      // Cualquier otro error
      else {
        alert('Por favor verifica los datos del formulario');
      }
    }
  }

}
