class EventManager {
    constructor() {
        if (typeof console === 'undefined' || typeof console.log === 'undefined') {
            console.warn('Console.log is not available. Event tracking will not be logged.');
            this.log = () => {};
        }
    }

    /**
     * @param {string} eventName
     * @param {object} [data] additional data
     */
    log(eventName, data = {}) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] Event: ${eventName}`;
        if (Object.keys(data).length > 0) {
            console.log(logMessage, data);
        } else {
            console.log(logMessage);
        }
    }
}

export default new EventManager();