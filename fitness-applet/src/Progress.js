import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
    root: {
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

class CircularIntegration extends React.Component {
    timer = null;

    state = {
        loading: false,
        success: false,
    };

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handleButtonClick = () => {
        this.props.onClick();
        if (!this.state.loading) {
            this.setState(
                {
                    success: false,
                    loading: true,
                },
                () => {
                    this.timer = setTimeout(() => {
                        this.setState({
                            loading: false,
                            success: true,
                        });
                    }, 2000);
                },
            );
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.changed !== this.props.changed) {
            this.setState({
                success: !this.props.changed,
            })
        }

    }

    render() {
        const { success } = this.state;
        const { classes } = this.props;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: success,
        });
        return (
            <div className={classes.root}>
                <Button
                    variant="fab"
                    color="primary"
                    className={buttonClassname}
                    onClick={this.handleButtonClick}
                >
                    {success ? <CheckIcon /> : <SaveIcon />}
                </Button>
            </div>
        );
    }
}

CircularIntegration.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIntegration);