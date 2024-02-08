# Zendesk Flow

Zendesk Flow is a powerful integration tool designed to seamlessly connect your application with the Zendesk API, streamlining the process of creating tickets effortlessly.

## Features

- **Automatic Ticket Creation:** Zendesk Flow automates the creation of tickets within Zendesk, enhancing efficiency.
- **Email Validation:** The submission form includes email validation, ensuring accurate user input.
- **Image Uploads:** Ability to associate images with tickets, providing additional context.

## Technologies Used

- [Next.js](https://nextjs.org/): A React framework for building server-side rendered applications.
- [Node.js](https://nodejs.org/): A JavaScript runtime for server-side development.
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript, adding static typing to the language.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for quickly building custom designs.

## Prerequisites

Ensure you have the following installed:

- Node.js
- Yarn (alternative to npm)
- Zendesk API URL
- Zendesk API Token

## Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/zendesk-flow.git
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd zendesk-flow
    ```

3. **Install Dependencies:**

    ```bash
    yarn install
    ```

4. **Configure Environment Variables:**

    Create a file named `.env.local` in the project root and add the following variables:

    ```env
    ZENDESK_API_URL=Your_Zendesk_URL
    ZENDESK_API_TOKEN=Your_Zendesk_Token
    ```

5. **Start the Development Server:**

    ```bash
    yarn dev
    ```

    Access the project at [http://localhost:3000](http://localhost:3000).

## Usage

1. **Fill out the Form:**
    - Provide the necessary information in the form.

2. **Submit the Form:**
    - Create a ticket in Zendesk by submitting the form.

## License

This project is licensed under the [MIT License](LICENSE).
