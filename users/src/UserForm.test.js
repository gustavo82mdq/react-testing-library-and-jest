import UserForm from "./UserForm";
import {render, screen} from "@testing-library/react";
import user from '@testing-library/user-event';

test('it shows two inputs and a button', () => {
    // render the component
    render(<UserForm />);

    // manipulate the component or find an element on it
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    // Assertion - make sure the component is doing what we expect it to do
    expect(button).toBeInTheDocument();
    expect(inputs).toHaveLength(2);
});

test('it calls onUserAdd when te form is submitted', async () => {
    const mock = jest.fn();

    render(<UserForm onUserAdd={mock} />);

    const [nameInput, emailInput] = screen.getAllByRole('textbox');

    await user.click(nameInput);
    await user.keyboard('jane');

    await user.click(emailInput);
    await user.keyboard('jane@jane.com');

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({ email: 'jane@jane.com', name: 'jane' });
})

test('empties the two inputs when form is submitted', async () => {
    render(<UserForm onUserAdd={() => {}} />);

    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });

    await user.click(nameInput);
    await user.keyboard('jane');

    await user.click(emailInput);
    await user.keyboard('jane@jane.com');

    const button = screen.getByRole('button');
    await user.click(button);

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
});