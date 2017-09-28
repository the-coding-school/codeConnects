import * as React from 'react';
import {t} from 'services/localeService';

interface Properties_t {
    id: string;
};

interface State_t {
    text: string;
};

export default class T extends React.Component<Properties_t, State_t> {
    render() {
        return <span>{this.state.text}</span>;
    };

    constructor(props: Properties_t) {
        super(props);
        this.state = {text: 'unlocalized'};
        t(props.id).then((text) => {
            this.setState({text});
        });
    }
}
