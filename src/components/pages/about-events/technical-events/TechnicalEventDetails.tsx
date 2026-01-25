import EventDetails from "../components/EventDetails";
import { technicalGroupEvents, technicalSoloEvents } from "@/src/data/technical-events-data";

const TechnicalEventDetails = () => {
    return (
        <EventDetails
            groupEvents={technicalGroupEvents}
            soloEvents={technicalSoloEvents}
            groupEventsImageFolder="/about-events/technical/group events"
            soloEventsImageFolder="/about-events/technical/solo events"
        />
    );
};

export default TechnicalEventDetails;

