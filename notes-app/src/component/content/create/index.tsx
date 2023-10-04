import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { resetForm, submitForm, updateForm } from '../../../store/slices/notes';

import {
  ColorBox,
  ColorIcon,
  CreateBoxWrapper,
  CreateNoteBox,
  ElementBox,
  NoteBottom,
  NoteContent,
  NoteTitle,
  SubmitBox,
  SubmitButton,
} from '../styled';

import { color } from '../../../assets/theme';

import { PickColorIcon } from '../../../assets/images/image';
import { useNote } from '../../../utils/hooks';

const CreateNote = () => {
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [openColorBox, setOpenColorBox] = useState<boolean>(false);
  const [hoverColor, setHoverColor] = useState<string>('');
  const [colors, setColors] = useState<string>('');

  const openRef = useRef<HTMLDivElement | null>(null);
  const noteContentRef = useRef<HTMLTextAreaElement | null>(null);

  const { form }: any = useNote();

  const hasTitleAndContent = form.title.length > 0 && form.content.length > 0;
  const hasBgColor = form.bgColor.length > 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openRef.current && !openRef.current.contains(e.target as Node)) {
        setIsDialogOpen(false);
        setColors('');
        setHoverColor('');
        setOpenColorBox(false);

        if (hasTitleAndContent || (hasTitleAndContent && hasBgColor)) {
          dispatch(submitForm());
        }
        dispatch(resetForm());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [form]);

  useEffect(() => {
    dispatch(updateForm({ bgColor: colors }));
  }, [colors]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = '0px'; // Temporarily reduce the height
    target.style.height = `${target.scrollHeight}px`; // Set the height to its content height
    const { name, value } = e.target as HTMLTextAreaElement;
    dispatch(updateForm({ [name]: value }));
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    dispatch(updateForm({ [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasTitleAndContent || (hasTitleAndContent && hasBgColor)) {
      dispatch(submitForm());
      setHoverColor('');
    }
  };

  return (
    <CreateBoxWrapper>
      <CreateNoteBox
        ref={openRef}
        onClick={() => setIsDialogOpen(true)}
        open={isDialogOpen}
        $createBg={form.bgColor}
        $hoverCreateBg={hoverColor}
      >
        {!isDialogOpen && 'Take a note...'}
        {isDialogOpen && (
          <>
            <NoteTitle
              maxLength={20}
              placeholder="Title..."
              value={form.title}
              onChange={handleChange}
              name="title"
            />
            <NoteContent
              name="content"
              ref={noteContentRef}
              onChange={handleContentChange}
              placeholder="Write your notes here..."
              value={form.content}
            />
            <NoteBottom>
              <ElementBox>
                <ColorIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenColorBox(!openColorBox);
                  }}
                >
                  <img src={PickColorIcon} alt="" />
                </ColorIcon>
                {openColorBox && (
                  <ColorBox>
                    {Object.keys(color.note).map((colorKey) => (
                      <button
                        key={colorKey}
                        style={{
                          background:
                            color.note[colorKey as keyof typeof color.note],
                        }}
                        onMouseOver={(e) => {
                          e.stopPropagation();
                          setHoverColor(
                            () =>
                              color.note[colorKey as keyof typeof color.note]
                          );
                        }}
                        onMouseLeave={(e) => {
                          e.stopPropagation();
                          setHoverColor('');
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setColors(
                            () =>
                              color.note[colorKey as keyof typeof color.note]
                          );
                          setOpenColorBox(false);
                        }}
                      />
                    ))}
                  </ColorBox>
                )}
              </ElementBox>
              <SubmitBox>
                <SubmitButton
                  $clearButton={true}
                  onClick={() => {
                    dispatch(resetForm());
                    setHoverColor('');
                  }}
                >
                  Clear
                </SubmitButton>
                <SubmitButton
                  disabled={!hasTitleAndContent}
                  onClick={handleSubmit}
                >
                  Save
                </SubmitButton>
              </SubmitBox>
            </NoteBottom>
          </>
        )}
      </CreateNoteBox>
    </CreateBoxWrapper>
  );
};

export default CreateNote;
