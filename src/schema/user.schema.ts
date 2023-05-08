import { object, string, TypeOf } from 'zod';

// verify that the User authentication data is valid
export const createUserSchema = object({
	body: object({
		name: string({
			required_error: 'Name is required',
		}),
		password: string({
			required_error: 'Password is required',
		}).min(8, 'Password must be at least 8 characters'),
		passwordConfirmation: string({
			required_error: 'Password confirmation is required',
		}),
		email: string({
			required_error: 'Email is required',
		}).email('Not a valid email'),
		accountType: string({
			required_error: 'Account type is required',
		}).refine(data => {
			return data === 'student' || data === 'professional';
		}),
	}).refine(data => data.password === data.passwordConfirmation, {
		message: 'Passwords do not match',
		path: ['passwordConfirmation'],
	}),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];