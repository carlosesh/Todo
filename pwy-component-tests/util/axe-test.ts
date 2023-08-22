import { test as base } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';
import { accessibilityTags } from '../../tests/util/constants';

type AxeFixture = {
    makeAxeBuilder: () => AxeBuilder;
};

// Extend base test by providing "makeAxeBuilder"
//
// This new "test" can be used in multiple test files, and each of them will get
// a consistently configured AxeBuilder instance.
export const test = base.extend<AxeFixture>({
	makeAxeBuilder: async ({ page }, use) => {
		const makeAxeBuilder = () => new AxeBuilder({ page })
		// https://www.deque.com/axe/core-documentation/api-documentation/#axe-core-tags
			.withTags(accessibilityTags);

		await use(makeAxeBuilder);
	}
});

export { expect } from '@playwright/test';
