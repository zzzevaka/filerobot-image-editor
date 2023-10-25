/** External Dependencies */
import styled from 'styled-components';
import IconButton from '@scaleflex/ui/core/icon-button';
import Input from '@scaleflex/ui/core/input';
import Label from '@scaleflex/ui/core/label';

const StyledInpaintWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledInpaintSliderField = styled.div`
  padding: 8px 12px;
`;

const StyledInpaintInput = styled(Input)`
  width: 70px;
  height: 24px;
  margin: ${({ noLeftMargin }) => (noLeftMargin ? '8px 8px 8px 0' : '8px')};
`;

const StyledRatioLockIcon = styled(IconButton)`
  margin-right: 16px;
`;

const StyledXLabel = styled(Label)`
  font-size: 13px;
  line-height: 15px;
`;

export {
  StyledInpaintSliderField,
  StyledInpaintWrapper,
  StyledInpaintInput,
  StyledRatioLockIcon,
  StyledXLabel,
};
