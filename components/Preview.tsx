/* eslint eqeqeq: 0 */
import {
  Box,
  Button,
  Circle,
  VStack,
  Image,
  Link,
  Text,
  Tooltip,
  useColorMode,
  useDisclosure,
  HStack,
  Switch,
} from "@chakra-ui/react";
//import Image from "next/image";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoInformationCircle } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { EmbedField, FormBuilder, FormOpenFormTypeBuilder } from "../util/types";
import { Channel, FormProfile, SlashCommand } from "./Mention";
import { PreviewStep } from "./PreviewStep";
import { AVATAR_URL } from "./config";
import { useScreenWidth } from "../util/width";
import { getValue } from "@testing-library/user-event/dist/utils";

function isEmpty(value: any) {
  return value == null || value == "";
}

const confirmationComponents = [{
  type: 1,
  components: [{
    type: 2,
    disabled: true,
    label: 'Sucessfully submitted form',
    style: 2
  }]
}]

export interface PreviewProperties {
  message: FormOpenFormTypeBuilder;
  forms: FormBuilder[];
  select_menu_placeholder: string;
  displayForm: number;
  setDisplayForm: React.Dispatch<React.SetStateAction<number>>;
  displayPage: number;
  setDisplayPage: React.Dispatch<React.SetStateAction<number>>;
  displaySection: boolean;
  stage: string;
  currentGuild: any;
}

function Preview({
  message,
  forms,
  //@ts-expect-error
  application_command,
  select_menu_placeholder,
  displayForm,
  setDisplayForm,
  displayPage,
  setDisplayPage,
  displaySection,
  stage,
  currentGuild,
}: PreviewProperties) {
  const { colorMode } = useColorMode();
  const isTinyScreen = !useScreenWidth(575);
  const defaultValues = {
    ...forms?.[displayForm]?.pages?.[displayPage]?.modal.components
      .map((e) => e.components[0])
      .map((e) => ({ [e.label]: e.value })),
  };
  const textInputs = useForm({
    defaultValues,
  });

  // const [displayTextInputContent, setDisplayTextInputContent]= useState(['','','','',''])

  const applicationCommandRef = useRef(null);
  const formRef = useRef(null);

  const executeApplicationCommandScroll = () => {
    if (applicationCommandRef.current != null)
      //@ts-expect-error
      applicationCommandRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const executeFormScroll = () => {
    if (formRef.current != null)
      //@ts-expect-error
      formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  if (displayForm < 0) displayForm = 0;

  function decimalToHexColor(decimal: number) {
    // Extract the red, green, and blue components
    let r = (decimal >> 16) & 0xff;
    let g = (decimal >> 8) & 0xff;
    let b = decimal & 0xff;

    // Convert each component to a hexadecimal string and pad with zeros if needed
    let rHex = r.toString(16).padStart(2, "0");
    let gHex = g.toString(16).padStart(2, "0");
    let bHex = b.toString(16).padStart(2, "0");

    // Concatenate the hexadecimal values and prepend with a '#'
    return `#${rHex}${gHex}${bHex}`;
  }

  const MessageEmbed = (msg: any) => (
    <>
      {msg?.embeds &&
        //@ts-expect-error
        msg.embeds.map((embed, index) => (
          <Box
            key={Math.random()}
            borderLeftColor={
              parseInt(embed?.color)
                ? decimalToHexColor(embed?.color as number)
                : "#202225"
            }
            borderLeftWidth="4px"
            mt="0.2rem"
            bg={colorMode === "dark" ? "#2f3136" : "#f2f3f5"}
            borderLeft={`4px solid ${!isEmpty(embed?.color)
                ? msg?.embeds?.[0]?.color
                : colorMode === "dark"
                  ? "#202225"
                  : "#e3e5e8"
              }`}
            maxWidth="520px"
            borderRadius="4px"
          >
            <Box padding="0.5rem 1rem 1rem 0.75rem">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}{" "}
              <Link
                href={
                  embed?.author?.url == undefined ? undefined : embed.author.url
                }
                style={{
                  cursor: isEmpty(embed?.author?.url) ? "default" : "pointer",
                }}
                _hover={
                  isEmpty(embed?.author?.url)
                    ? { textDecoration: "none" }
                    : { textDecoration: "underline" }
                }
              >
                <Box display="flex" alignItems="center" m="2px 0px 0px">
                  {embed?.author?.icon_url != undefined && (
                    <Image
                      alt="Author Image"
                      src={embed.author.icon_url === '{MemberAvatarURL}' ? 'https://cdn.discordapp.com/embed/avatars/5.png' : embed.author.icon_url}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        marginRight: "8px",
                      }}
                    />
                  )}
                  <Box
                    fontSize="0.875rem"
                    fontWeight="500"
                    whiteSpace="pre-wrap"
                  >
                    {embed?.author?.name}
                  </Box>
                </Box>
              </Link>
              <Box>
                <Text
                  fontFamily="Whitney Bold"
                  fontSize="0.975rem"
                  mt="3px"
                  whiteSpace="pre-wrap"
                >
                  {embed?.title}
                </Text>
                <Text fontSize="0.875rem" whiteSpace="pre-wrap">
                  {embed?.description}
                </Text>
              </Box>
              <Box>
                {/* @ts-expect-error */}
                {embed?.fields?.length && embed?.fields?.map(field => <Box key={Math.random()}>
                  <Text
                    fontWeight="600"
                    fontSize='.875rem'
                    whiteSpace="pre-wrap">{field?.name}</Text>
                  {/^{TextInputValue\d}$/.test(field?.value) ? <Text
                    fontSize="0.875rem"
                    color="#a3a6aa"
                  >
                    Answer will be displayed here
                  </Text> :
                    <Text fontSize='.875rem'
                      whiteSpace="pre-wrap">{field?.value}</Text>}

                </Box>)}
              </Box>
              {!isEmpty(embed?.image?.url) && (
                <Image
                  alt="Image"
                  src={embed?.image?.url}
                  style={{
                    maxWidth: "400px",
                    maxHeight: "300px",
                    borderRadius: "4px",
                    marginTop: "16px",
                  }}
                />
              )}
              {!isEmpty(embed?.footer?.text) && (
                <Box
                  display="flex"
                  alignItems="center"
                  mt="8px"
                  whiteSpace="pre-wrap"
                >
                  {embed?.footer?.icon_url != undefined && (
                    <Image
                      alt="Footer Icon"
                      src={embed.footer.icon_url}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        marginRight: "8px",
                      }}
                    />
                  )}
                  <Text
                    fontFamily="Whitney Bold"
                    fontSize="0.80rem"
                    color="#fbfbfb"
                    width={`calc(100% - ${embed?.footer?.icon_url != undefined ? "32" : "0"
                      }px)`}
                  >
                    {embed?.footer?.text}
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        ))}
    </>
  );

  const [FormsProfileHidden, setHidden] = useState(true);
  const HandleInteraction = () => setHidden(!FormsProfileHidden);
  const { isOpen, onToggle } = useDisclosure();

  const [temporaryModalHighlight, setTemporaryModalHighlight] = useState(false);
  const [temporarySubmissionHighlight, setTemporarySubmissionHighlight] =
    useState(false);

  const [discohook, setDiscohook] = useState(false);

  //@ts-expect-error
  const discohookMessage = (message) => {
    let msg = { ...message };
    if (msg)
      msg.author = {
        name: "Forms",
        icon_url:
          "https://cdn.discordapp.com/avatars/942858850850205717/a_437f281f490a388866b7be0b3cd7cc33.gif",
      };
    return msg;
  };

  return (
    <Box
      overflowY="scroll"
      p={isTinyScreen ? 0 : "16px 16px 16px 12px"}
      maxHeight="calc(100vh - 48px);"
      display={displaySection ? "block" : "none"}
    >
      <VStack align="start" spacing={isTinyScreen ? 0 : 3}>
        {!application_command && (
          <PreviewStep
            number={1}
            highlighted={!isTinyScreen && stage === "openFormType"}
            title={<>A form is sent to the channel where <SlashCommand>form create</SlashCommand> is run</>}
          >
            <Box display={discohook ? "block" : "none"}>
              <iframe
                src={`https://discohook.app/viewer?data=${Buffer.from(
                  JSON.stringify({
                    version: "d2",
                    messages: [{ data: discohookMessage(message) }],
                  })
                ).toString("base64")}&header=false`}
                style={{
                  width: "100%",
                  height: "200px",
                  border: "none",
                  padding: "20px",
                  background: "white",
                  borderRadius: "8px",
                  resize: "vertical",
                  overflow: "auto",
                }}
                title="Content"
              />
            </Box>

            <Box
              display={discohook ? "none" : "flex"}
              bg={colorMode === "dark" ? "grey.dark" : "white"}
              borderRadius="8px"
              p={isTinyScreen ? 0 : 4}
            >
              <Box flexShrink={0}>
                <FormProfile
                  {...{
                    avatar: AVATAR_URL,
                    hidden: FormsProfileHidden,
                    HandleInteraction,
                  }}
                >
                  <Image
                    alt="Form's Avatar"
                    src={AVATAR_URL}
                    style={{
                      width: "40px",
                      height: "40px",
                      clipPath: "circle(50%)",
                      marginTop: "5px",
                      marginRight: "16px",
                    }}
                    width="40px"
                    height="40px"
                    clipPath="circle(50%)"
                    mt="5px"
                    mr="16px"
                  />
                </FormProfile>
              </Box>
              <Box width="calc(100% - 56px)">
                <Box display="flex" alignItems="center">
                  <Text
                    fontFamily="Whitney Bold"
                    _hover={{ textDecoration: "underline" }}
                    cursor="pointer"
                  >
                    Forms
                  </Text>
                  <Box
                    display="flex"
                    backgroundColor="#5865F2"
                    borderRadius=".1875rem"
                    ml="4px"
                    height=".9375rem"
                    width="39px"
                  >
                    <Tooltip
                      hasArrow
                      label={<Box>Verified App</Box>}
                      placement="top"
                      bg="#181414"
                    >
                      <svg
                        color="white"
                        width="16"
                        height="16"
                        viewBox="0 0 16 15.2"
                      >
                        <path
                          d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </Tooltip>
                    <Text
                      fontFamily="Whitney Bold"
                      fontSize=".625rem"
                      textColor="white"
                    >
                      APP
                    </Text>
                  </Box>
                  <Box pl={2} display="inline-block">
                    <Tooltip
                      hasArrow
                      label={"You can use the components below to switch forms"}
                      placement="right"
                      shouldWrapChildren
                      bg="#181414"
                    >
                      <IconContext.Provider
                        value={{
                          color: "#b9bbbe",
                          size: "20px",
                          style: {
                            display: "inline-block",
                          },
                        }}
                      >
                        <Box>
                          <IoInformationCircle />
                        </Box>
                      </IconContext.Provider>
                    </Tooltip>
                  </Box>
                  <Text
                    fontFamily="Whitney Bold"
                    fontSize="0.75rem"
                    color="#a3a6aa"
                    ml=".5rem"
                    alignSelf="flex-end"
                    mb="1px"
                  >
                    Today at {new Date().getHours() < 10 ? "0" : ""}
                    {new Date().getHours()}:
                    {new Date().getMinutes() < 10 ? "0" : ""}
                    {new Date().getMinutes()}
                  </Text>
                </Box>
                <Box>
                  {message?.content && (
                    <Text fontFamily="Whitney" whiteSpace="pre-wrap">
                      {message.content}
                    </Text>
                  )}
                  {MessageEmbed(message)}
                  <Box p="4px 0">
                    {!forms?.[0].select_menu_option &&
                      message?.components?.[0]?.components?.map(
                        (component, index) => (
                          <Button
                            key={Math.random()}
                            onClick={() => {
                              if (component.style === 5) {
                                try {
                                  window.open(component.url, "_blank");
                                } catch { }
                              } else {
                                setDisplayPage(0);
                                setDisplayForm(
                                  parseInt(
                                    //@ts-expect-error
                                    component.custom_id?.match(/\d+/)[0]
                                  ) - 1
                                );
                                if (
                                  displayForm ===
                                  parseInt(
                                    //@ts-expect-error
                                    component.custom_id?.match(/\d+/)[0]
                                  ) -
                                  1
                                ) {
                                  setTemporaryModalHighlight(true);
                                  executeFormScroll();
                                  setTimeout(
                                    () => setTemporaryModalHighlight(false),
                                    300
                                  );
                                }
                              }
                            }}
                            height="32px"
                            fontSize="14px"
                            paddingBlock={0}
                            paddingInline={0}
                            padding="2px 16px"
                            m="4px 8px 4px 0"
                            variant={
                              //@ts-expect-error
                              message?.components[0].components[index]?.style ==
                                1
                                ? "discord-primary" //@ts-expect-error
                                : message?.components[0].components[index]
                                  ?.style == 2
                                  ? "discord-secondary" //@ts-expect-error
                                  : message?.components[0].components[index]
                                    ?.style == 3
                                    ? "discord-success" //@ts-expect-error
                                    : message?.components[0].components[index]
                                      ?.style == 4
                                      ? "discord-danger"
                                      : "discord-secondary"
                            }
                          >
                            {
                              message?.components?.[0]?.components?.[index]
                                ?.label
                            }
                            {message?.components?.[0]?.components?.[index].style == 5 && <Box ml='8px'><svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M15 2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V4.41l-4.3 4.3a1 1 0 1 1-1.4-1.42L19.58 3H16a1 1 0 0 1-1-1Z"></path><path fill="currentColor" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 1 0-2 0v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 1 0 0-2H5Z"></path></svg></Box>}
                          </Button>
                        )
                      )}
                    {forms?.[0].select_menu_option && (
                      <Box>
                        <Box
                          width={
                            forms.find(
                              (e) =>
                                (e?.select_menu_option?.description?.length ??
                                  0) > 40
                            ) != null
                              ? 450
                              : "auto"
                          }
                          onClick={onToggle}
                          cursor="pointer"
                          backgroundColor={
                            colorMode == "light" ? "#e9eaed" : "#1e1f22"
                          }
                          borderRadius={3.5}
                          borderBottomRadius={isOpen ? 0 : 3.5}
                          pl={3.5}
                          pr={2}
                          py={2}
                        >
                          <Text
                            color={colorMode == "light" ? "#5c5e66" : "#949a96"}
                            display="inline-block"
                          >
                            {select_menu_placeholder ||
                              "Select a form to preview"}
                          </Text>
                          <Box float="right" display="inline-block" pr={1}>
                            <IconContext.Provider
                              value={{
                                color:
                                  colorMode == "light" ? "#313338" : "#e0e1e5",
                                size: "25px",
                              }}
                            >
                              {isOpen ? <MdExpandLess /> : <MdExpandMore />}
                            </IconContext.Provider>
                          </Box>
                        </Box>
                        <Box
                          hidden={!isOpen}
                          backgroundColor={
                            colorMode == "light" ? "#eeeff1" : "#2b2d31"
                          }
                          borderColor={
                            colorMode == "light" ? "#e0e1e5" : "#1e1f22"
                          }
                          borderWidth="1.22px"
                          borderBottomRadius={3.5}
                        >
                          {forms.map((form, index) => (
                            <Box
                              key={Math.random()}
                              cursor="pointer"
                              _hover={{
                                backgroundColor:
                                  colorMode == "light" ? "#dddee1" : "#36373d",
                              }}
                              p={2}
                              onClick={() => {
                                onToggle();
                                setDisplayForm(index);
                                if (displayForm === index) {
                                  setTemporaryModalHighlight(true);
                                  setTimeout(() => executeFormScroll(), 1);
                                  setTimeout(
                                    () => setTemporaryModalHighlight(false),
                                    800
                                  );
                                }
                              }}
                            >
                              <HStack>
                                {form?.select_menu_option?.emoji?.id && (
                                  <Image
                                    width="22px"
                                    src={`https://cdn.discordapp.com/emojis/${form?.select_menu_option?.emoji?.id}.webp?size=96`}
                                    alt="Select menu emoji"
                                  />
                                )}
                                <Box>
                                  <Text
                                    color={
                                      colorMode == "light"
                                        ? "#424244"
                                        : "#eeeff0"
                                    }
                                  >
                                    {form?.select_menu_option?.label}
                                  </Text>
                                  <Text
                                    color={
                                      colorMode == "light"
                                        ? "#64666d"
                                        : "#9fa0a6"
                                    }
                                    maxWidth={400}
                                  >
                                    {form?.select_menu_option?.description}
                                  </Text>
                                </Box>
                              </HStack>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>

            {!isTinyScreen &&
              /(:\w+:)|(<&\d+>)|(<@&?\d+>)|(<\/[\w ]+(:\d+)>)|(>(>>)? )|(^#{1,3} )|(^-# )|^(\*|-) |\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_|`[^`]+`|\|\|[^|]+\|\||```[\s\S]*?```/m.test(
                JSON.stringify(message)
              ) && (
                <Box
                  mt={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="right"
                  fontSize="12px"
                >
                  <Switch
                    onChange={(event) => {
                      setDiscohook(event.target.checked);
                    }}
                    colorScheme="blurple"
                    size="sm"
                    mr={2}
                  />
                  Use discohook for message rendering
                </Box>
              )}
          </PreviewStep>
        )}

        <PreviewStep
          number={!application_command ? 2 : 1}
          title={
            !application_command ? (
              "User opens a form"
            ) : (
              <>
                User opens the form with{" "}
                {application_command?.name ? (
                  <SlashCommand>{application_command?.name}</SlashCommand>
                ) : (
                  "the slash command"
                )}
              </>
            )
          }
          controls={
            forms?.[displayForm]?.pages.length > 1 && (
              <HStack>
                <svg
                  onClick={() =>
                    displayPage > 0 && setDisplayPage(displayPage - 1)
                  }
                  style={{
                    cursor: displayPage > 0 ? "pointer" : "not-allowed",
                    transform: `rotate(${270}deg)`,
                  }}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M12 10L8 6L4 10"
                    stroke={displayPage > 0 ? "#bcbcbc" : "grey"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Text userSelect="none">Page {displayPage + 1}</Text>
                <svg
                  onClick={() =>
                    displayPage + 1 < forms?.[displayForm]?.pages.length &&
                    setDisplayPage(displayPage + 1)
                  }
                  style={{
                    cursor:
                      displayPage + 1 < forms?.[displayForm]?.pages.length
                        ? "pointer"
                        : "not-allowed",
                    transform: `rotate(${90}deg)`,
                  }}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M12 10L8 6L4 10"
                    stroke={
                      displayPage + 1 < forms?.[displayForm]?.pages.length
                        ? "#bcbcbc"
                        : "grey"
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </HStack>
            )
          }
          highlighted={
            (!isTinyScreen && stage === "form") || temporaryModalHighlight
          }
          reference={formRef}
        >
          <Box
            display="flex"
            bg={colorMode === "dark" ? "grey.dark" : "white"}
            borderRadius="8px"
            p={isTinyScreen ? 0 : 4}
            width="100%"
          >
            <Box
              border={`1px solid ${colorMode === "dark" ? "#292b2f" : "#e3e5e8"
                }`}
              borderRadius="3px"
              width="440px"
              maxWidth="100%"
              height="fit-content"
              maxHeight="720px"
              userSelect='none'
            >
              {" "}
              {/* overflowY='scroll' */}
              <Box
                display="flex"
                height="fit-content"
                justifyContent="space-between"
                alignItems="center"
                p="16px 12px"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  height="24px"
                  width="calc(100% - 32px)"
                >
                  <Image
                    src={AVATAR_URL}
                    alt="Forms Logo"
                    width="24px"
                    height="24px"
                    style={{ clipPath: "circle(50%)", marginRight: "8px" }}
                  />
                  <Text
                    fontSize="24px"
                    color={colorMode === "dark" ? "white" : "#060607"}
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                  >
                    {forms?.[displayForm]?.pages?.[displayPage]?.modal.title}
                  </Text>
                </Box>
                <Box display="flex" p="4px" cursor="pointer" opacity='.5' _hover={{ opacity: 1 }} transition='opacity.2s ease-in-out'>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="#b5bac1"
                      d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                    ></path>
                  </svg>
                </Box>
              </Box>
              <Box overflow='hidden scroll' className="scrollbar-modal" maxH='588px'>
                {forms?.[displayForm]?.pages?.[
                  displayPage
                ]?.modal.components.map((actionRow, i) => (
                  <>
                    <Box key={Math.random()} p="0 4px 1em 12px" >
                      <Text
                        fontSize="13px"
                        mb="8px"
                        color={colorMode === "dark" ? "#b9bbbe" : "#4f5660"}
                        fontFamily='Noto Sans'
                        textTransform='uppercase'
                        fontWeight='750'
                      >
                        {actionRow.components[0]?.label}
                        {actionRow.components[0]?.required !== false && (
                          <span
                            style={{ color: "#fa777b", paddingLeft: "4px", fontFamily: 'Whitney' }}
                          >
                            *
                          </span>
                        )}
                      </Text>
                      <Box position="relative">
                        <Box
                          as={
                            actionRow.components[0]?.style == 1
                              ? "input"
                              : "textarea"
                          }
                          bg={colorMode === "dark" ? "#202225" : "#e3e5e8"}
                          height={
                            actionRow.components[0]?.style == 2
                              ? "85px"
                              : "2.2rem"
                          }
                          borderRadius='3px'
                          fontSize="16px"
                          resize="none"
                          border="0px"
                          _focus={{ border: "0px" }}
                          placeholder={actionRow.components[0]?.placeholder}
                          //@ts-ignore
                          //{...textInputs.register(`${actionRow.components[0].label}`)}
                          // onChange={event => setDisplayTextInputContent(prev => {
                          //   let newValue = [...prev]
                          //   newValue[i] = event.target.value
                          //   return newValue
                          // })}
                          // value={displayTextInputContent[i]}
                          defaultValue={actionRow.components[0].value}
                        />
                        {/* {actionRow.components[0]?.style == 2 && <Box position='absolute' bottom='12px' right='14px'>{(actionRow.components[0]?.max_length || 4000) - displayTextInputContent[i].length}</Box>} */}
                      </Box>
                    </Box>
                  </>
                ))}
              </Box>
              <Box
                bg={colorMode === "dark" ? "#2f3136" : "#f2f3f5"}
                p="16px"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Button
                  variant="link"
                  color={colorMode === "dark" ? "white" : "#747f8d"}
                  border="0px"
                  mr={4}
                  _focus={{ border: "0px" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="discord-primary"
                  border="0px"
                  _focus={{ border: "0px" }}
                  onClick={() => {
                    if (displayPage + 1 < forms?.[displayForm]?.pages.length) {
                      setDisplayPage(displayPage + 1);
                    } else {
                      setTemporarySubmissionHighlight(true);
                      //@ts-expect-error
                      executeApplicationCommandScroll(applicationCommandRef);
                      setTimeout(
                        () => setTemporarySubmissionHighlight(false),
                        300
                      );
                    }
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </PreviewStep>

        <PreviewStep
          number={!application_command ? 3 : 2}
          title={
            forms[displayForm].submit_channel ? (
              <>A channel is created for the submission</>
            ) : forms[displayForm].submit_thread ? (
                  `A ${forms[displayForm].submit_thread?.type === 12
                    ? "private "
                    : ""
                  }thread is created for the submission`
                ) : forms[displayForm].submit_channel_id &&
                      Array.isArray(currentGuild) &&
                      currentGuild.find(
                        (channel) =>
                          channel.id === forms[displayForm].submit_channel_id
                      ) ? (
                      <>The submission is sent to <Channel>
                        {
                          currentGuild.find(
                            (channel) =>
                              channel.id ===
                              forms[displayForm].submit_channel_id
                          ).name
                        }
                      </Channel></>
                    ) : forms?.[displayForm]?.google_sheets_url === undefined || forms[displayForm].submit_channel_id !== undefined ? 
                      "The submission is sent to a channel"
                     : null
          }
          highlighted={
            (!isTinyScreen &&
              (stage === "server_selection" || stage === "submissions")) ||
            temporarySubmissionHighlight
          }
          reference={applicationCommandRef}
        >
        {(forms?.[displayForm]?.google_sheets_url === undefined || (forms?.[displayForm]?.submit_channel_id !== undefined || forms?.[displayForm]?.submit_channel !== undefined || forms?.[displayForm]?.submit_thread !== undefined)) && <><Box
            bg={colorMode === "dark" ? "grey.dark" : "white"}
            borderRadius="8px"
            p={isTinyScreen ? 0 : 4}
          >
            <Box display="flex">
              <Box flexShrink={0}>
                <FormProfile
                  {...{
                    avatar: AVATAR_URL,
                    hidden: FormsProfileHidden,
                    HandleInteraction,
                  }}
                >
                  <Image
                    alt="Form's Avatar"
                    src={AVATAR_URL}
                    style={{
                      width: "40px",
                      height: "40px",
                      clipPath: "circle(50%)",
                      marginTop: "5px",
                      marginRight: "16px",
                    }}
                    width="40px"
                    height="40px"
                    clipPath="circle(50%)"
                    mt="5px"
                    mr="16px"
                  />
                </FormProfile>
              </Box>
              <Box width="calc(100% - 56px)">
                <Box display="flex" alignItems="center">
                  <Text
                    fontFamily="Whitney Bold"
                    _hover={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Forms
                  </Text>
                  <Box
                    display="flex"
                    backgroundColor="#5865F2"
                    borderRadius=".1875rem"
                    ml="4px"
                    height=".9375rem"
                    width="39px"
                  >
                    <Tooltip
                      hasArrow
                      label={<Box>Verified App</Box>}
                      placement="top"
                      bg="#181414"
                    >
                      <svg
                        color="white"
                        width="16"
                        height="16"
                        viewBox="0 0 16 15.2"
                      >
                        <path
                          d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </Tooltip>
                    <Text
                      fontFamily="Whitney Bold"
                      fontSize=".625rem"
                      textColor="white"
                    >
                      APP
                    </Text>
                  </Box>
                  <Text
                    fontFamily="Whitney Bold"
                    fontSize="0.75rem"
                    color="#a3a6aa"
                    ml=".5rem"
                    alignSelf="flex-end"
                    mb="1px"
                  >
                    Today at {new Date().getHours() < 10 ? "0" : ""}
                    {new Date().getHours()}:
                    {new Date().getMinutes() < 10 ? "0" : ""}
                    {new Date().getMinutes()}
                  </Text>
                </Box>
                {forms?.[displayForm]?.submit_message && <>
                  {forms?.[displayForm]?.submit_message?.content}
                  {MessageEmbed(forms?.[displayForm]?.submit_message)}
                </>}
                {forms?.[displayForm]?.guild_submit_message && <>
                  {forms?.[displayForm]?.guild_submit_message?.content}
                  {MessageEmbed(forms?.[displayForm]?.guild_submit_message)}
                </>}
                {!(forms?.[displayForm]?.submit_message || forms?.[displayForm]?.guild_submit_message) && (
                  <Box
                    bg={colorMode === "dark" ? "#2f3136" : "#f2f3f5"}
                    borderLeft={
                      colorMode === "dark"
                        ? "4px solid #202225"
                        : "4px solid #e3e5e8"
                    }
                    maxWidth="520px"
                    borderRadius="4px"
                  >
                    <Box padding="0.5rem 1rem 1rem 0.75rem">
                      <Box
                        display="flex"
                        alignItems="center"
                        m="8px 0px 0px"
                      >
                        <Image
                          alt="Test User's Avatar"
                          src="https://cdn.discordapp.com/embed/avatars/5.png"
                          width="24px"
                          height="24px"
                          borderRadius="50%"
                          mr="8px"
                        />
                        <Box
                          fontFamily="Whitney Bold"
                          fontSize="0.875rem"
                          fontWeight="500"
                        >
                          User
                        </Box>
                      </Box>
                      <Box>
                        {forms?.[displayForm]?.pages?.[
                          displayPage
                        ]?.modal.components.map((actionRow) => (
                          <Box key={Math.random()}>
                            <Text
                              fontFamily="Whitney Black"
                              fontSize="0.875rem"
                              mt="8px"
                            >
                              {actionRow.components[0]?.label}
                            </Text>
                            <Text
                              fontSize="0.875rem"
                              color={
                                actionRow.components[0]?.value
                                  ? "white"
                                  : "#a3a6aa"
                              }
                            >
                              {actionRow.components[0]?.value ||
                                "(Answer will be displayed here)"}
                            </Text>
                          </Box>
                        ))}
                      </Box>
                      {/* <Box display="flex" alignItems="center" mt="8px">
                      <Image
                        alt="ID"
                        src="https://cdn.discordapp.com/emojis/882601305871360040.png"
                        width="20px"
                        height="20px"
                        mr="8px"
                        borderRadius="50%"
                      />
                      <Text
                        fontFamily="Whitney Bold"
                        fontSize="0.75rem"
                        color={colorMode === "dark" ? "#fbfbfb" : "#313338"}
                      >
                        643945264868098049
                      </Text>
                    </Box> */}
                    </Box>
                  </Box>
                )}
                <Box>
                  {forms?.[displayForm]?.submit_components?.map(
                    (_: any, i: number) => (
                      <HStack key={i} gap={0}>
                        {forms?.[displayForm]?.submit_components?.[
                          i
                        ].components?.map((button) => (
                          <Button
                            key={Math.random()}
                            height="32px"
                            fontSize="14px"
                            paddingBlock={0}
                            paddingInline={0}
                            padding="2px 16px"
                            m="4px 8px 4px 0"
                            variant={
                              button.style === 1
                                ? "discord-primary"
                                : button.style === 2
                                  ? "discord-secondary"
                                  : button.style === 3
                                    ? "discord-success"
                                    : "discord-danger"
                            }
                          >
                            {button.label}
                          </Button>
                        ))}
                      </HStack>
                    )
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          {forms?.[displayForm]?.dm_submit_message !== null && <Text mt={2} fontWeight={isTinyScreen ? '600' : '500'}>User{forms?.[displayForm]?.dm_submit_message === undefined ? ' also' : ''} gets a DM confirmation of their submission</Text>}
          {(forms?.[displayForm]?.dm_submit_message || forms?.[displayForm]?.guild_submit_message) && !forms?.[displayForm]?.submit_message && <>
            <Box
              bg={colorMode === "dark" ? "grey.dark" : "white"}
              borderRadius="8px"
              mt={2}
            >
              <HStack display={isTinyScreen ? 'none' : 'flex'} gap={0} height='48px' borderBottomColor='rgba(0,0,0,.4)' borderBottomWidth='1px'>
                <FormProfile
                  {...{
                    avatar: AVATAR_URL,
                    hidden: FormsProfileHidden,
                    HandleInteraction,
                  }}
                >
                  <Image
                    alt="Form's Avatar"
                    src={AVATAR_URL}
                    style={{
                      width: "24px",
                      height: "24px",
                      clipPath: "circle(50%)",
                      marginTop: "5px",
                      marginRight: "16px",
                    }}
                    clipPath="circle(50%)"
                    mx="12px"
                  />
                </FormProfile>
                <Text fontSize='16px' fontWeight='600'>Forms</Text>
              </HStack>
              <Box display="flex" p={isTinyScreen ? 0 : 4}>
                <Box flexShrink={0}>
                  <FormProfile
                    {...{
                      avatar: AVATAR_URL,
                      hidden: FormsProfileHidden,
                      HandleInteraction,
                    }}
                  >
                    <Image
                      alt="Form's Avatar"
                      src={AVATAR_URL}
                      style={{
                        width: "40px",
                        height: "40px",
                        clipPath: "circle(50%)",
                        marginTop: "5px",
                        marginRight: "16px",
                      }}
                      width="40px"
                      height="40px"
                      clipPath="circle(50%)"
                      mt="5px"
                      mr="16px"
                    />
                  </FormProfile>
                </Box>
                <Box width="calc(100% - 56px)">
                  <Box display="flex" alignItems="center">
                    <Text
                      fontFamily="Whitney Bold"
                      _hover={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      Forms
                    </Text>
                    <Box
                      display="flex"
                      backgroundColor="#5865F2"
                      borderRadius=".1875rem"
                      ml="4px"
                      height=".9375rem"
                      width="39px"
                    >
                      <Tooltip
                        hasArrow
                        label={<Box>Verified App</Box>}
                        placement="top"
                        bg="#181414"
                      >
                        <svg
                          color="white"
                          width="16"
                          height="16"
                          viewBox="0 0 16 15.2"
                        >
                          <path
                            d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </Tooltip>
                      <Text
                        fontFamily="Whitney Bold"
                        fontSize=".625rem"
                        textColor="white"
                      >
                        APP
                      </Text>
                    </Box>
                    <Text
                      fontFamily="Whitney Bold"
                      fontSize="0.75rem"
                      color="#a3a6aa"
                      ml=".5rem"
                      alignSelf="flex-end"
                      mb="1px"
                    >
                      Today at {new Date().getHours() < 10 ? "0" : ""}
                      {new Date().getHours()}:
                      {new Date().getMinutes() < 10 ? "0" : ""}
                      {new Date().getMinutes()}
                    </Text>
                  </Box>
                  {forms?.[displayForm]?.submit_message && <>
                    {forms?.[displayForm]?.submit_message?.content}
                    {MessageEmbed(forms?.[displayForm]?.submit_message)}
                  </>}
                  {forms?.[displayForm]?.dm_submit_message && <>
                    {forms?.[displayForm]?.dm_submit_message?.content}
                    {MessageEmbed(forms?.[displayForm]?.dm_submit_message)}
                  </>}
                  {!(forms?.[displayForm]?.submit_message || forms?.[displayForm]?.dm_submit_message) && (
                    <>
                      <Box
                        bg={colorMode === "dark" ? "#2f3136" : "#f2f3f5"}
                        borderLeft={
                          colorMode === "dark"
                            ? "4px solid #202225"
                            : "4px solid #e3e5e8"
                        }
                        maxWidth="520px"
                        borderRadius="4px"
                      >
                        <Box padding="0.5rem 1rem 1rem 0.75rem">
                          <Box
                            display="flex"
                            alignItems="center"
                            m="8px 0px 0px"
                          >
                            <Image
                              alt="Test User's Avatar"
                              src="https://cdn.discordapp.com/embed/avatars/5.png"
                              width="24px"
                              height="24px"
                              borderRadius="50%"
                              mr="8px"
                            />
                            <Box
                              fontFamily="Whitney Bold"
                              fontSize="0.875rem"
                              fontWeight="500"
                            >
                              User
                            </Box>
                          </Box>
                          <Box>
                            {forms?.[displayForm]?.pages?.[
                              displayPage
                            ]?.modal.components.map((actionRow) => (
                              <Box key={Math.random()}>
                                <Text
                                  fontFamily="Whitney Black"
                                  fontSize="0.875rem"
                                  mt="8px"
                                >
                                  {actionRow.components[0]?.label}
                                </Text>
                                <Text
                                  fontSize="0.875rem"
                                  color={
                                    actionRow.components[0]?.value
                                      ? "white"
                                      : "#a3a6aa"
                                  }
                                >
                                  {actionRow.components[0]?.value ||
                                    "(Answer will be displayed here)"}
                                </Text>
                              </Box>
                            ))}
                          </Box>
                          {/* <Box display="flex" alignItems="center" mt="8px">
                      <Image
                        alt="ID"
                        src="https://cdn.discordapp.com/emojis/882601305871360040.png"
                        width="20px"
                        height="20px"
                        mr="8px"
                        borderRadius="50%"
                      />
                      <Text
                        fontFamily="Whitney Bold"
                        fontSize="0.75rem"
                        color={colorMode === "dark" ? "#fbfbfb" : "#313338"}
                      >
                        643945264868098049
                      </Text>
                    </Box> */}
                        </Box>
                      </Box>
                    </>
                  )}
                  <Box>
                    {confirmationComponents.map(
                      (_: any, i: number) => (
                        <HStack key={i} gap={0}>
                          {confirmationComponents[
                            i
                          ].components?.map((button) => (
                            <Button
                              key={Math.random()}
                              height="32px"
                              fontSize="14px"
                              paddingBlock={0}
                              paddingInline={0}
                              padding="2px 16px"
                              isDisabled={button.disabled}
                              m="4px 8px 4px 0"
                              variant={
                                button.style === 1
                                  ? "discord-primary"
                                  : button.style === 2
                                    ? "discord-secondary"
                                    : button.style === 3
                                      ? "discord-success"
                                      : "discord-danger"
                              }
                            >
                              {button.label}
                            </Button>
                          ))}
                        </HStack>
                      )
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </>}</>}
          {forms?.[displayForm]?.google_sheets_url !== undefined && <Text mt={2} fontWeight={isTinyScreen ? '600' : '500'}>The submission is{forms?.[displayForm]?.submit_channel_id !== undefined || forms?.[displayForm]?.submit_channel !== undefined ? ' also' : ''} sent to the <a style={{
                    color: "oklab(0.700834 -0.0780351 -0.1469)",
                  }} href={forms?.[displayForm]?.google_sheets_url} target="_blank"><Text display='inline-block' _hover={{ textDecor: 'underline' }}>google sheet</Text></a></Text>}

        </PreviewStep>
      </VStack>
    </Box>
  );
}

export default Preview;
