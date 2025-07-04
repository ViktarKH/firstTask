# **Technologies Used**

* *HTML5*: Provides the foundational structure of the web page.
* *SCSS (Sass)*: A CSS preprocessor used for writing more organized, modular, and maintainable styles.
* *JavaScript (ES6+)*: Powers all interactive elements and application logic.
* *Webpack*: A module bundler responsible for compiling, bundling, and optimizing all project assets (JS, SCSS, images, videos), and for running a local development server.
* *Swiper.js*: A highly performant and customizable modern touch slider library used for the product image gallery.
* *GSAP (GreenSock Animation Platform)*: A robust animation library employed for creating smooth, high-performance animations, such as the pulsating CTA button.

# **Architectural and Technological Decisions**

The following architectural and technological decisions were made during the development of this ad unit:

### 1. **Scene-based Architecture**
  The application is structured around the concept of distinct "scenes" (`IntroScene`, `GalleryScene`, `VideoScene`), with each scene managing a specific phase of the user's interaction. Scene transitions are orchestrated by a dedicated `SceneManager`.
  * **Advantages:** This approach ensures clear separation of concerns, isolating the logic and components of each scene. This significantly simplifies development, debugging, and the future addition of new steps to the ad unit's flow, enhancing code readability and maintainability.

### 2. **JavaScript Modularity (ES Modules)**
  JavaScript code is organized using ES Modules (`import`/`export`), allowing the breakdown of functionality into smaller, reusable units (e.g., `ProductGallery`, `EventManager`, `SceneManager`).
  * **Advantages:** Improves code organization, reduces global namespace pollution, promotes code reusability, and facilitates easier testing of individual modules.

### 3. **Webpack for Asset Bundling**
  Webpack was chosen as the primary bundling tool. It processes SCSS, transpiles JavaScript (via Babel for compatibility), and handles the importing and optimization of images and video assets.
  * **Advantages:** Ensures bundle size optimization (through features like tree-shaking and minification), enables the use of modern JavaScript and SCSS features, and provides a convenient development server with hot module replacement for rapid development.

### 4. **Swiper.js for the Gallery**
  Swiper.js was selected for implementing the product image gallery.
  * **Advantages:** It is a highly optimized and lightweight library, perfectly suited for touch-enabled devices. Swiper offers extensive customization options and excellent performance, which are critical considerations for interactive ad creatives.

### 5. **GSAP for Animations**
  GSAP is utilized for creating animations, such as the "pulsing" effect on the Call To Action (CTA) button.
  * **Advantages:** GSAP is renowned for its high performance, reliability, and ease of use for complex timelines and animations. It ensures smooth animations even on less powerful devices, contributing to a superior user experience in advertising materials.

### 6. **Device Orientation Handling**
  The project includes logic to detect and respond to device orientation, displaying an appropriate message if a specific orientation is recommended or required.
  * **Advantages:** Enhances the user experience by informing users about the optimal viewing orientation, which is particularly important for creatives designed with a specific layout in mind.

# How to Run the Project Locally

To set up and run this project on your local machine, please follow these steps:

### 1. **Prerequisites**

Ensure you have [Node.js](https://nodejs.org/) installed, which includes npm (Node Package Manager). If you prefer using Yarn, ensure it is also installed.

### 2. **Clone the Repository**

Open your terminal or command prompt and execute the following command to download the project to your computer:

```bash
git clone https://github.com/ViktarKH/firstTask.git
```
### 3. **Navigate to the Project Directory**

After cloning, change your current directory to the project's root folder:

```bash
cd firstTask # Or the name you gave the project folder during cloning
```
### 4. **Install Dependencies**

Install all necessary project dependencies listed in package.json by running:

```bash
npm install
```
### 5. **Start the Development Server**

To run the project in development mode with hot reloading and a local server:

```bash
npm run build
```
This command will generate optimized and minified files within the dist/ folder. These files can then be deployed to any static web server for public access.

### 6. **project launch**

```bash
npm start
```
