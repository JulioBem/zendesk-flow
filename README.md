# Zendesk Flow

Zendesk Flow is a modern integration tool built with a selection of cutting-edge technologies to provide a workflow for interacting with the Zendesk API.

## Technologies Used

- [Next.js](https://nextjs.org/): A React framework for building server-side rendered applications.
- [Node.js](https://nodejs.org/): A JavaScript runtime for server-side development.
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript, adding static typing to the language.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for quickly building custom designs.

## Why Next.js?

- **React Framework:** Next.js is a React framework that enables server-side rendering, providing better performance and improved SEO.
- **Simplified Development:** With Next.js, the development process is streamlined, allowing for faster and more efficient coding.

## Why Node.js?

- **JavaScript Runtime:** Node.js is a powerful JavaScript runtime, providing a non-blocking, event-driven architecture suitable for building scalable network applications.
- **Unified Language:** The use of Node.js allows for a unified JavaScript language stack across the entire application.

## Why TypeScript?

- **Static Typing:** TypeScript adds static typing to JavaScript, catching potential errors during development and improving code quality.
- **Enhanced Developer Experience:** With TypeScript, developers benefit from improved code navigation, autocompletion, and better documentation.

## Why Tailwind CSS?

- **Utility-First Approach:** Tailwind CSS follows a utility-first approach, offering a highly customizable and low-level utility styling framework.
- **Rapid Prototyping:** Tailwind CSS accelerates the styling process and allows for rapid prototyping without sacrificing design flexibility.

## Prerequisites

Ensure you have the following installed:

- Node.js
- Yarn (alternative to npm)
- Zendesk API URL
- Zendesk API Token

## Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/juliobem/zendesk-flow.git
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
