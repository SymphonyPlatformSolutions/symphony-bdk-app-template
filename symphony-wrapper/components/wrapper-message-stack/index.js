import React from 'react';
import './symphony.scss';
import './chat-module.css';

/**
 * FILE TO BE IMPLEMENTED.
 */
const WrapperMessageStack = props => (
  <div id="rendered-content" className="rendered-content with-blue-border">
    <div className="rendered-content-container contrast theme-color-grey trader twentyfour-hour-with-sec-time light condensed">
      <div id="main-content-wrapper" className="contrast light condensed">
        <div id="content-wrapper">
          <div id="simple_grid" className="simple_grid_has_one_container">
            <div className="simple_grid_container simple_grid_main_container simple-jack-large">
              <div className="instant-message chat-module module single-party">
                <div className="module-content-wrapper">
                  <section className="module-content">
                    <div className="chatroom-messages-wrap">
                      <div className="chatroom-messages">
                        <div className="chat-message-list-manager-wrapper">
                          <div className="chat-message-list-container">
                            <div className="message-list">
                              <div className="resize-sensor-wrap">
                                <div className="module-scrollable message-group-container">
                                  <div className=" message-group">
                                    <div className="message-group__content rendered-content-wrapper">
                                      <div className="message-group__content rendered-content-wrapper">
                                        <div className="social message read-by-me received background-colorable">
                                          <div className="message__inner-wrapper">
                                            <div className="metadata message__metadata">
                                              <div className="time-formats">
                                                <time className="twenty-four-hour-with-seconds posted-time">18:10:10</time>
                                              </div>
                                              <div className="author metadata__author">
                                                <span className="display-name aliasable colorable">You</span>
                                              </div>
                                            </div>
                                            <div className="message__body-wrapper ">
                                              <div
                                                className="message__body body message-content"
                                                dangerouslySetInnerHTML={{
                                                  __html: props.htmlContent,
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default WrapperMessageStack;
