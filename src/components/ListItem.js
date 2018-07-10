import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    TouchableWithoutFeedback,
    View,
    LayoutAnimation
} from 'react-native';
import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component {
    componentDidUpdate() {
        LayoutAnimation.spring();
    }
    renderDescription() {
        const { library, expanded } = this.props;
        const { description } = library.item;
        if (expanded) {
            return (
                <CardSection>
                    <Text>{description}</Text>
                </CardSection>
            );
        }
    }
    render() {
        const { selectLibrary, library, selectedLibraryId } = this.props;
        const { title, id } = library.item;

        return (
            <TouchableWithoutFeedback onPress={() => selectLibrary(id)}>
                <View>
                    <CardSection>
                        <Text style={styles.title}>{title}</Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    title: {
        fontSize: 18,
        paddingLeft: 15
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.item.id;
    return {
        selectedLibraryId: state.selectedLibraryId,
        expanded
    };
};

export default connect(
    mapStateToProps,
    actions
)(ListItem);
