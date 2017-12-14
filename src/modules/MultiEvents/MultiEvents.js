export default function multiEventsRegister() {
    EventTarget.prototype.addMultiEvents = function addMultiEvents(events, handler) {
        events.split(' ').forEach(event => {
            this.addEventListener(event, handler);
        });
    };
}
