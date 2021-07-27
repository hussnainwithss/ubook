import React, { useContext } from 'react';
import {
    useAccordionToggle,
    Accordion,
    AccordionContext,
    Card,
} from 'react-bootstrap';

const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey)
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
        <div>
            <Accordion.Toggle
                as={Card.Header}
                variant="link"
                className={`accordian-toggle ${
                    isCurrentEventKey ? 'accordian-active' : ''
                }`}
                onClick={decoratedOnClick}
            >
                {children}
            </Accordion.Toggle>
        </div>
    );
};

export default ContextAwareToggle;
