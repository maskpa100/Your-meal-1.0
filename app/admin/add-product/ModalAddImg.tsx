import { Box, Button, Modal } from '@mui/material';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

type Props = {
  image: string;
  setCroppedImg: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  setNoImg: Dispatch<SetStateAction<boolean>>;
};

export default function ModalAddImg({ image, setCroppedImg, setOpen, open, setNoImg }: Props) {
  const [zoom, setZoom] = useState(1);
  const editorRef = useRef<AvatarEditor>(null);

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();

      const imageDataURL = canvas.toDataURL('image/png');
      setCroppedImg(imageDataURL);
      setNoImg(false);
      setOpen(false);
    }
  };
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 'auto' }}>
          <h2 style={{ textAlign: 'center' }}>Обрежьте изображения</h2>
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={492}
            height={392}
            border={50}
            color={[234, 234, 234, 0.8]}
            style={{
              border: '2px solid #ddd',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'rgb(214, 214, 214)',
            }}
            scale={zoom}
            rotate={0}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              alignItems: 'center',
              width: '100%',
              mt: '15px',
            }}
          >
            <div>
              <Button
                variant="outlined"
                sx={{ mr: 2, ml: 2 }}
                onClick={() => {
                  setZoom(zoom - 0.1);
                }}
              >
                -
              </Button>
              <Button
                variant="outlined"
                sx={{ mr: 2, ml: 2 }}
                onClick={() => {
                  setZoom(zoom + 0.1);
                }}
              >
                +
              </Button>
            </div>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                mt: '15px',
              }}
            >
              <div>
                <Button variant="contained" sx={{ mr: 2, ml: 2 }} onClick={handleSave}>
                  Обрезать изображение
                </Button>
              </div>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
