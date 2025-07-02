import { test, expect } from '@playwright/test';

test.describe('Badge Component', () => {
  test('should render all badge variants correctly', async ({ page }) => {
    await page.setContent(`
      <div style="display: flex; flex-direction: column; gap: 10px; padding: 10px;">
        <span class="badge default">Default Badge</span>
        <span class="badge primary">Primary Badge</span>
        <span class="badge secondary">Secondary Badge</span>
        <span class="badge success">Success Badge</span>
        <span class="badge warning">Warning Badge</span>
        <span class="badge danger">Danger Badge</span>
      </div>
      <style>
        .badge {
          display: inline-block;
          padding: 0.25em 0.6em;
          font-size: 75%;
          font-weight: 700;
          line-height: 1;
          text-align: center;
          white-space: nowrap;
          vertical-align: baseline;
          border-radius: 0.25rem;
        }
        .default {
          color: #212529;
          background-color: #f8f9fa;
        }
        .primary {
          color: #fff;
          background-color: #0d6efd;
        }
        .secondary {
          color: #fff;
          background-color: #6c757d;
        }
        .success {
          color: #fff;
          background-color: #198754;
        }
        .warning {
          color: #000;
          background-color: #ffc107;
        }
        .danger {
          color: #fff;
          background-color: #dc3545;
        }
      </style>
    `);

    // Wait for the content to be rendered
    await page.waitForSelector('.badge');

    // Take a screenshot to visually verify the badges
    await expect(page).toHaveScreenshot('badge-variants.png');
  });
});
