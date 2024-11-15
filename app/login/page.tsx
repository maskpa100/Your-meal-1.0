'use client';

import { authenticate } from '@/app/lib/actions';

import { useFormState, useFormStatus } from 'react-dom';
import s from './style.module.scss';
export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className={s.background}>
      <div className={s.form}>
        <div className={s.login}>
          <h1>Вход в систему</h1>
          <form action={dispatch}>
            <div>
              <div className={s.fields}>
                <div>
                  <label htmlFor="email">Email</label>
                  <div>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <div>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      required
                      minLength={5}
                    />
                  </div>
                </div>
              </div>
              <div className={s.error} aria-live="polite" aria-atomic="true">
                {errorMessage && (
                  <>
                    <p>{errorMessage}</p>
                  </>
                )}
              </div>
              <LoginButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return <button aria-disabled={pending}>Log in</button>;
}
