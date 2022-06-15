import { css } from '@emotion/react';
import styled from '@emotion/styled';
import LoadingOverlay from 'react-loading-overlay';
import './stayled.css';

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 99999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${(props) =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

export default function LoadingOverlayComponent({ text = 'Loading...', loading }) {
  return (
    <DarkBackground disappear={loading}>
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          bgcolor: 'rgba(0, 0, 0, 0.4)',
          boxShadow: 24,
          p: 4,
        }}
      >
        <LoadingOverlay active={Boolean(true)} spinner={Boolean(true)} text={text}>
          {/* <p>Some content or children or something.</p> */}
        </LoadingOverlay>
      </div>
    </DarkBackground>
  );
}
