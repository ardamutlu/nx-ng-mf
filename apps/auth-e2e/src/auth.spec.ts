import { expect, test } from '@playwright/test';

test.describe('Auth Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
  });

  test('should render login form', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Login to your account' }),
    ).toBeVisible();

    await expect(
      page.getByText('Enter your email below to login to your account'),
    ).toBeVisible();

    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });

  test('should have disabled submit button initially', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /sign in/i });
    await expect(submitBtn).toBeDisabled();
  });

  test('should validate email and password', async ({ page }) => {
    const email = page.getByLabel('Email');
    const password = page.getByLabel('Password');
    const submitBtn = page.getByRole('button', { name: /sign in/i });

    await email.fill('invalid');
    await password.fill('123');

    await email.blur();
    await password.blur();

    await expect(page.getByText('Enter a valid email address.')).toBeVisible();

    await expect(
      page.getByText('Password must be at least 8 characters long.'),
    ).toBeVisible();

    await expect(submitBtn).toBeDisabled();
  });

  test('should enable submit when form is valid', async ({ page }) => {
    const email = page.getByLabel('Email');
    const password = page.getByLabel('Password');
    const submitBtn = page.getByRole('button', { name: /sign in/i });

    await email.fill('test@example.com');
    await password.fill('12345678');

    await expect(submitBtn).toBeEnabled();
  });

  test('should show provider login buttons', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Login with GitHub' }),
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Login with Google' }),
    ).toBeVisible();
  });

  test('should trigger github redirect', async ({ page }) => {
    let targetUrl = '';

    await page.route('**', (route) => {
      const url = route.request().url();

      if (url.includes('github')) {
        targetUrl = url;
        return route.abort();
      }

      return route.continue();
    });

    await page.goto('/auth/login');

    await page
      .getByRole('button', {
        name: 'Login with GitHub',
      })
      .click();

    await expect.poll(() => targetUrl).toContain('github');
  });
});
