import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Masonry from 'react-masonry-css';

import {
  NoteForm,
  deleteNote,
  updateCurrentNote,
  updateNote,
} from '../../../store/slices/notes';

import {
  MasonryContainer,
  NotesWrapper,
  MasonryItem,
  NoteFooterBox,
  NoteCloseButton,
  NoteColorWrapper,
  ColorIcon,
  ColorBox,
  NoteTitle,
  NoteContent,
} from '../styled';

import { color } from '../../../assets/theme';
import { DeleteIcon, PickColorIcon } from '../../../assets/images/image';

const Notes = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);
  const [openColorBox, setOpenColorBox] = useState<number | null>(null);
  const [colors, setColors] = useState<Record<number, string>>({});
  const [hoverColor, setHoverColor] = useState<Record<number, string>>({});

  const noteRef = useRef<(HTMLDivElement | null)[]>([]);

  const loader = useRef(null);

  const notes = useSelector((state: any) => state.notes.notes);
  const currentNote = useSelector((state: any) => state.notes.currentNote);

  const handleObserver = (entities: any) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      let targetElement: any = e.target; // start with the target element

      // check if the clicked element or any of its parents have our 'data-masonry-item' attribute
      while (targetElement !== null) {
        if (targetElement.getAttribute('data-masonry-item') === 'true') {
          return; // exit the function, because we clicked inside a MasonryItem
        }
        targetElement = targetElement.parentElement;
      }

      setExpandedItemId(null);
      setOpenColorBox(null);
      dispatch(updateNote());
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const handleItemExpand = (id: number) => {
    setExpandedItemId(id);
  };
  const handleColorBox = (id: number) => {
    setOpenColorBox((prevId) => (prevId === id ? null : id));
  };

  const handleContentUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = '0px'; // Temporarily reduce the height
    target.style.height = `${target.scrollHeight}px`; // Set the height to its content height
    const { name, value } = e.target as HTMLTextAreaElement;
    dispatch(updateCurrentNote({ [name]: value }));
  };

  const handleTitleUpdate = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    dispatch(updateCurrentNote({ [name]: value }));
  };

  const onUpdateCurrentNote = (note: NoteForm) => {
    dispatch(
      updateCurrentNote({
        title: note.title,
        id: note.id,
        content: note.content,
        bgColor: note.bgColor,
      })
    );
  };
  const onColorPick = (note: any, colorKey: any) => {
    const selectedColor = color.note[colorKey as keyof typeof color.note];

    setColors((prev) => ({
      ...prev,
      [note.id]: selectedColor,
    }));

    dispatch(
      updateCurrentNote({
        bgColor: selectedColor,
      })
    );
    setHoverColor('');

    setOpenColorBox(null);
  };
  return (
    <NotesWrapper>
      <MasonryContainer>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.length < 1
            ? 'No Notes'
            : [...notes].reverse().map((note: any, index: number) => {
                return (
                  <div
                    ref={(el) => (noteRef.current[index] = el)}
                    key={index}
                    data-masonry-item="true"
                  >
                    <MasonryItem
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemExpand(note.id);
                        onUpdateCurrentNote(note);
                      }}
                      $expanded={expandedItemId === note.id}
                      $noteBackground={
                        expandedItemId === note.id
                          ? currentNote.bgColor
                          : note.bgColor
                      }
                      $hoverNoteBackground={
                        expandedItemId === note.id ? hoverColor[note.id] : ''
                      }
                    >
                      {expandedItemId === note.id ? (
                        <>
                          <NoteTitle
                            name="title"
                            id="title"
                            type="text"
                            value={currentNote.title}
                            onChange={handleTitleUpdate}
                          />
                          <NoteContent
                            name="content"
                            id="content"
                            value={currentNote.content}
                            onChange={handleContentUpdate}
                          />

                          <NoteFooterBox>
                            <NoteColorWrapper
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <ColorIcon
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleColorBox(note.id);
                                }}
                              >
                                <img src={PickColorIcon} alt="" />
                              </ColorIcon>

                              {openColorBox === note.id && (
                                <ColorBox>
                                  {Object.keys(color.note).map((colorKey) => (
                                    <button
                                      key={colorKey}
                                      style={{
                                        background:
                                          color.note[
                                            colorKey as keyof typeof color.note
                                          ],
                                      }}
                                      onMouseOver={(e) => {
                                        e.stopPropagation();
                                        setHoverColor((prev) => ({
                                          ...prev,
                                          [note.id]:
                                            color.note[
                                              colorKey as keyof typeof color.note
                                            ],
                                        }));
                                      }}
                                      onMouseLeave={(e) => {
                                        e.stopPropagation();
                                        setHoverColor('');
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onColorPick(note, colorKey);
                                      }}
                                    />
                                  ))}
                                </ColorBox>
                              )}
                              <ColorIcon
                                $removeIcon
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(deleteNote({ id: note.id }));
                                }}
                              >
                                <img src={DeleteIcon} alt="" />
                              </ColorIcon>
                            </NoteColorWrapper>
                            {expandedItemId === note.id && (
                              <NoteCloseButton>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedItemId(null);
                                    setOpenColorBox(null);
                                  }}
                                >
                                  Close
                                </button>
                              </NoteCloseButton>
                            )}
                          </NoteFooterBox>
                        </>
                      ) : (
                        <>
                          <h3>{note.title}</h3>
                          <p>{note.content}</p>
                        </>
                      )}
                    </MasonryItem>
                  </div>
                );
              })}
        </Masonry>
      </MasonryContainer>
    </NotesWrapper>
  );
};

export default Notes;