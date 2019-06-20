import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ENRICHER_EVENTS } from 'services/enrichers/entities';
import { BlueButton } from '../commons';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/twilight';
import {Warning} from 'styled-icons/material';

const DrawerModal = styled.div`
  position: fixed;
  border-radius: 2px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  padding: 2rem;
  left: -100%;
  opacity: 0;
  transition: left 0.3s ease-in-out, opacity 0.3s ease-in-out;
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  height: calc(100vh - 82px);
  &.open {
    left: 6px;
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 45rem;
`;

const CloseButton = styled.button`
  border: none;
  border-radius: 50%;
  height: 1.8rem;
  width: 1.8rem;
  font-size: 1.3rem;
  color: #919191;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: none;
`;

const Title = styled.span`
  font-size: 2rem;
`;
const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled.select`
  background: white;
  border: 2px solid #807c7c;
  padding: 5px;
`;

const FloatingRightButton = styled(BlueButton)`
  margin: 10px 0 0 0;
  position: absolute;
  right: 15px;
  width: 10rem;
`;

const WarningIcon = styled(Warning)`
  color: #ffff00;
  margin-right: 10px;
`;



const keyMapEntities = Object.keys(ENRICHER_EVENTS).map(key => ({
  key,
  type: ENRICHER_EVENTS[key].type,
  json: ENRICHER_EVENTS[key].json,
}));


class EntityDrawer extends React.Component {
  jsonFieldRef;

  selectRef;

  state = {
    jsonText: JSON.stringify(keyMapEntities[0].json, 0, 4),
  }

  handleSelectChange = ({target}) => {
    const { selectedIndex } = target;
    this.setState({
      jsonText: JSON.stringify(keyMapEntities[selectedIndex].json, 0, 4),
    });
  };

  handleJsonChange = (data) => {
      this.setState({
      jsonText: data,
    });
  }

   handleOnClick = () => {
     const { submitHandler } = this.props;
     const { jsonText } = this.state;
     submitHandler(this.selectRef.value || this.textFieldRef.value, { id: jsonText || '{}' });
   }


   render() {
     const {
       closeHandler, isOpen,
     } = this.props;

     const { jsonText } = this.state;


     return (
       <DrawerModal className={isOpen ? 'open' : null}>
         <Container>
           <TopContainer>
             <Title>Select Entities for enrichment</Title>
             <span>
               <WarningIcon size={35} />
               <i>These entities need to be <b>defined</b> in your GeneralEnricher.js <b>and</b> in its entities.js dependency</i>
             </span>
             <CloseButton type="button" onClick={closeHandler}>x</CloseButton>
           </TopContainer>
           <h4>Select Entity</h4>
           <StyledSelect onChange={this.handleSelectChange} ref={(ref) => { this.selectRef = ref; }}>
             { keyMapEntities.map(entry => <option key={entry.key} value={entry.type}>{entry.key}</option>)}
           </StyledSelect>
           <hr />
           <h4>Entity JSON</h4>
           <AceEditor
            placeholder="Placeholder Text"
            mode="json"
            theme="twilight"
            name="enricher"
            onChange={this.handleJsonChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            wrapEnabled
            value={jsonText}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}/>
           <FloatingRightButton
             type="button"
             onClick={this.handleOnClick}>
             Render Entity
           </FloatingRightButton>
         </Container>
       </DrawerModal>
     );
   }
}

EntityDrawer.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
};

EntityDrawer.defaultProps = {
  isOpen: false,
};

export default EntityDrawer;
