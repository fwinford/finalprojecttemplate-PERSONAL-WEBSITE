import React from 'react';

const Contact = () => {
    return (
        <secontion id="contact">
            <h2>Contact</h2>
            <form>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Email: </label>
                <input type="email" id="email" name="email" required />
                
                <label htmlFor="name">Name: </label>
                <textarea type="message" name="message" required></textarea>

                <button type="submit">Submit</button>
            </form>
        </secontion>
    );
};

export default Contact;