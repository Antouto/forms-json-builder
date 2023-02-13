/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from 'react';
import {
    Box,
    VStack,
    Grid,
    Text,
    Button,
    Heading,
    useToast,
    HStack, cssVar,
    Spinner,
    Center,
    Badge,
    Tooltip, ModalFooter,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Modal,
    useDisclosure,
    FormLabel, Textarea, useColorModeValue, useColorMode, Input
} from '@chakra-ui/react';
import { DOWNLOAD_SPINNER_TIME } from '../components/JSONViewer';
import ErrorMessage from '../components/ErrorMessage';
import _DefaultValues from '../DefaultValues.json';
import _ClearedValues from '../ClearedValues.json';
import { Meta } from '../components/Meta';
import { EmbedAuthor, EmbedBuilder, EmbedFooter, FormAndMessageBuilder } from "../util/types";
import { Navigation } from '../components/Navigation';
import StaffAppForm from "../templates/StaffApp.json";
import { FormDataResponse } from '../util/api';
import { useModal } from '../components/SettingsModal';
import Image from 'next/image';
import { MdCheck, MdStar, MdStarBorder, MdVerified } from 'react-icons/md';
import Preview from '../components/Preview';

const DefaultValues = _DefaultValues as FormAndMessageBuilder;
const ClearedValues = _ClearedValues as FormAndMessageBuilder;
const $SwitchBackground = cssVar("switch-bg");

const Defaults = {
    Embed: {
        color: 5793266,
        title: "Example Form",
        description: "Fill out the form below!",
        author: {
            name: "",
            url: "",
            icon_url: ""
        },
        footer: {
            text: "",
            icon_url: ""
        }
    },
    Message: 'Fill out the form below!'
};

const defaultValues = DefaultValues as FormAndMessageBuilder;

export interface TemplateData {
    templates: FormDataResponse[] | null;
    error?: string;
}

export default function Templates({ templates, error }: TemplateData) {
    const toast = useToast();
    const SettingsModal = useModal();

    enum ToastStyles {
        Success = "success",
        Info = "info",
        Warning = "wraning",
        Error = "error",
        Loading = "loading"
    }

    function postToast({ title, description, style }: {
        title: string;
        description?: string;
        style: ToastStyles;
    }) {
        return toast({
            title,
            description,
            status: style as unknown as undefined,
            containerStyle: {
                backgroundColor: "#5865f2",
                borderRadius: "0.3rem"
            },
            position: "bottom",
            duration: 3000,
            isClosable: true,
        });
    }

    const downloadForm = (formData: any, fileName: string) => {
        setTimeout(() => {
            console.log("downloading...")
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                JSON.stringify(formData, null, 2)
            )}`;
            const link = document.createElement("a");
            link.href = jsonString;
            link.download = fileName + ".json";
            link.click();
        }, 500)
    }

    // if (templates == null) return (
    //     <>
    //         <VStack pt={50}>
    //             <Heading>Something didn't go right...</Heading>
    //             <Text pt={2} pb={5} fontSize={20}>We had trouble fetching templates.</Text>
    //             <Code p={5} backgroundColor="#2f3136" textColor="white" borderColor="#202225" borderWidth={1.3} borderRadius="md">
    //                 {error}
    //             </Code>
    //         </VStack>
    //     </>
    // );

    //@ts-expect-error
    const Forms: FormDataResponse[] = [{
        description: "Recruit staff to your server. This form includes helper, moderator, and administrator.",
        name: "Staff Application",
        official: true,
        //@ts-expect -error
        data: StaffAppForm,
        formBuilder: false,
        highlighted: false
    }, /*...templates.map(e => {
        const data = typeof e == "string" ? JSON.parse(e) : e;
        return {
            data: JSON.parse(data.data),
            ...data
        }
    })*/].sort(function (x, y) {
        // true values first
        return (x === y) ? 0 : x ? 1 : -1;
        // false values first
        // return (x === y)? 0 : x? 1 : -1;
    });

    const { colorMode } = useColorMode();

    function FixForm(formData: FormAndMessageBuilder) {
        formData.forms.forEach((form, i) => {
            if (formData.forms[i].button != null) formData.forms[i].button.style = Number(form.button.style);
            form.modal.components.forEach((actionRow) => {
                actionRow.components.forEach((e, index) => {
                    console.log(e)
                    Object.entries(e).map(([k, v]) => {
                        console.log(k, v)
                        if (v === null) return { key: k, value: v };
                        //@ts-expect-error
                        // eslint-disable-next-line eqeqeq
                        if (v == '') e[k] = null;
                        //@ts-expect-error
                        else if (typeof v != "boolean" && !isNaN(Number(v))) e[k] = Number(v);
                        return { key: k, value: v };
                    });

                    formData.forms[i].modal.components[index].components[index] = e;
                })
            })
        });

        const Message = formData.message;

        if (Message?.embeds != null && Message.embeds.length > 0) {
            console.log("fixing...")
            Message.embeds.forEach((embed, i) => {
                Object.entries(embed).forEach(([_key, v]) => {
                    const k = _key as keyof EmbedBuilder;
                    if (typeof v == "string") {
                        //@ts-expect-error
                        if (v == null || v === "") formData.message.embeds[i][k] = null;
                    } else if (typeof v == "object") {
                        Object.entries(v).forEach(([_k, v2], i2) => {
                            const k2 = _k as keyof EmbedAuthor | keyof EmbedFooter;
                            //@ts-expect-error
                            if (v2 == null || v2 === "") formData.message.embeds[i][k][k2] = null;
                        })
                    }
                })
            });
        }
    }

    async function postWebhook(message: string, name: string, description: string) {
        const fetched = await fetch("https://discord.com/api/webhooks/1074115246765117481/Hwkiz9jxjDjwY6T7hPSt7Ry_ceieQ-fVu3eMZPBXGoz_CZlZV4vzZz0CJVIvA-7m_bcM", {
            body: JSON.stringify({
                content: "```json\n" + message + "\n```",
                embeds: [{
                    title: name,
                    description
                }]
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST"
        });
    }

    const { isOpen, onClose, onOpen } = useDisclosure();
    const JsonData = useRef("");
    const Name = useRef("");
    const Description = useRef("");
    const isInvalid = useState(true);
    function HandleInput(func: () => unknown) {
        //if (Name.current.length <= 3 || Description.current.length <= 3 || JsonData.current.length <= 3) isInvalid[1](true);
        if (Name.current != "" && Description.current != "" && JsonData.current != "") isInvalid[1](false);
        console.log(Name.current, Description.current)
        return func();
    }

    return (
        <>
            <Meta>Templates</Meta>
            <Navigation {...SettingsModal} />
            <Center pt={10}>
                <VStack bgImage="/stars.svg" bgSize="contain" paddingX={150} bgRepeat="no-repeat">
                    {/* <Image src="/stars.svg" alt='Stars' width={5} height={5} /> */}
                    <Badge bgColor="#5865f2" fontWeight="bold" fontSize={20} width="20" borderRadius="full" textAlign="center" textColor="white">NEW</Badge>
                    <Heading>Form Templates</Heading>
                    <Text></Text>
                    <ErrorMessage>Templates can only be added by website admins currently.</ErrorMessage>
                    <Button onClick={onOpen}>Submit a Form</Button>
                </VStack>
            </Center>
            {SettingsModal.modal}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent backgroundColor="#36393f">
                    {/* <ModalHeader _after={{
                    borderBottom: "none"
                }} paddingBottom="3.5">
                    Configuration
                </ModalHeader> */}
                    <HStack pl={5} pt={4}>
                        <Image
                            src="/forms.svg"
                            alt="Forms Logo"
                            width={28}
                            height={28}
                            style={{
                                clipPath: 'circle(50%)'
                            }}
                        />
                        <Heading size="md" pl={2} fontWeight="medium">Submit Template</Heading>
                    </HStack>
                    <ModalCloseButton />
                    <ModalBody paddingY={6}>
                        <FormLabel pt={0}>Name</FormLabel>
                        <Input onChange={(e) => HandleInput(() => Name.current = e.target.value)} />
                        <FormLabel pt={1.5}>Description</FormLabel>
                        <Input onChange={(e) => HandleInput(() => Description.current = e.target.value)} />
                        <FormLabel pt={1.5}>JSON Data</FormLabel>
                        <Textarea onChange={(e) => HandleInput(() => JsonData.current = e.target.value)} _focusVisible={{ borderColor: "" }} _hover={{ borderColor: "" }} backgroundColor="#2f3136" textColor="white" borderColor="#202225" borderWidth={1.3} borderRadius="md" mt={2} />
                        {isInvalid[0] && <Box pt={3}><ErrorMessage>Fill out all the fields before sending your template</ErrorMessage></Box>}
                    </ModalBody>

                    <ModalFooter backgroundColor="#2f3136" borderBottomRadius={5}>
                        <Button variant="primary" mr={-2} onClick={() => {
                            onClose();
                            postWebhook(JsonData.current, Name.current, Description.current);
                        }} isDisabled={isInvalid[0]}>
                            Send
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Grid gridTemplateColumns='1fr 1fr' px={50} pt={10}>
                {Forms.map(form => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const [loading, setLoading] = useState(false);
                    const handleLoad = () => {
                        setLoading(true);
                        (() => {
                            FixForm(form.data);
                            setTimeout(() => {
                                downloadForm(form.data, form.data.forms[0].modal.title.split(" ").map((e: string) => e.toLowerCase()).join("_"))
                            }, 500);
                        })();
                        setTimeout(() => setLoading(false), DOWNLOAD_SPINNER_TIME);
                    }
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const { isOpen, onOpen, onClose } = useDisclosure();

                    return (
                        <Box mx={2} my={2} key={form.name} bgColor={colorMode == "light" ? "#292b2f" : "#ebedef"} borderRadius="lg" px={5} py={5}>
                            <HStack>
                                <Heading size="md" display="inline-block">{form.name}</Heading>
                                {form.official && <Tooltip label={(
                                    <Box>
                                        <HStack>
                                            <MdVerified color='#2da565' size={20} display="inline" />
                                            <Text display="inline">This is an official template built by admins</Text>
                                        </HStack>
                                    </Box>
                                )} placement='top' shouldWrapChildren bg="#18191c" borderRadius={6} px={3} py={2}>
                                    <Box display="inline-block" pt={1}>
                                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="28px" viewBox="0 0 24 24" width="28px" fill="#2da565"><g><rect fill="none" height="24" width="24" /><rect fill="none" height="24" width="24" /></g><g><path d="M23,12l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,12l2.44,2.79l-0.34,3.7 l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,12z M9.38,16.01L7,13.61c-0.39-0.39-0.39-1.02,0-1.41 l0.07-0.07c0.39-0.39,1.03-0.39,1.42,0l1.61,1.62l5.15-5.16c0.39-0.39,1.03-0.39,1.42,0l0.07,0.07c0.39,0.39,0.39,1.02,0,1.41 l-5.92,5.94C10.41,16.4,9.78,16.4,9.38,16.01z" /></g></svg>
                                    </Box>
                                </Tooltip>}
                                {form.highlighted && <Tooltip label={(
                                    <Box>
                                        <HStack>
                                            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#f9c23c"><g><path d="M0 0h24v24H0V0z" fill="none" /><path d="M0 0h24v24H0V0z" fill="none" /></g><g><path d="m12 17.27 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z" /></g></svg>
                                            <Text display="inline">This template is highlighted</Text>
                                        </HStack>
                                    </Box>
                                )} placement='top' shouldWrapChildren bg="#18191c" borderRadius={6} px={3} py={2}>
                                    <Box display="inline-block" pt={1}>
                                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="28px" viewBox="0 0 24 24" width="28px" fill="#f9c23c"><g><path d="M0 0h24v24H0V0z" fill="none" /><path d="M0 0h24v24H0V0z" fill="none" /></g><g><path d="m12 17.27 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z" /></g></svg>
                                    </Box>
                                </Tooltip>}
                            </HStack>
                            <Text pt={1} fontSize={17}>
                                {form.description}
                            </Text>
                            <Box pt={5}>
                                {/* <Box display="inline-flex" float="left" pt={3}>
                                    <Box>
                                        <HStack>
                                            <MdVisibility />
                                            <Text>{form.views}</Text>
                                            <MdOutlineFileDownload />
                                            <Text>{form.downloads}</Text>
                                        </HStack>
                                    </Box>
                                </Box> */}
                                <Box display="inline-block" float="right">
                                    {/* <Tooltip label={(
                                        <ErrorMessage>Forms cannot be previewed currently</ErrorMessage>
                                    )} placement='top' shouldWrapChildren bg="#18191c" borderRadius={6} px={3} py={2}>
                                        <Button _hover={{
                                            bgColor: ""
                                        }} variant="secondary" mr={3} isDisabled>Preview</Button>
                                    </Tooltip> */}
                                    <Button variant="secondary" mr={3} onClick={onOpen}>Preview</Button>
                                    <Button
                                        variant="success"
                                        onClick={handleLoad}
                                        //width="26"
                                        width={24}
                                    >
                                        {!loading && "Download"}
                                        {loading && <Spinner size="sm" />}
                                    </Button>
                                </Box>
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent bgColor={colorMode === 'dark' ? '#ffffff' : '#36393f'} boxShadow="none" width="unset">
                                        <Box display='flex'>
                                            <Box border={`1px solid ${colorMode === 'dark' ? '#e3e5e8' : '#292b2f'}`} borderRadius='3px' width='440px' height='fit-content' maxHeight='720px'> {/* overflowY='scroll' */}
                                                <Box display='flex' height='fit-content' justifyContent='space-between' alignItems='center' p='16px'>
                                                    <Box display='flex' alignItems='center' height='24px'>
                                                        <Image src="https://cdn.discordapp.com/attachments/944646735643410482/953304477102915624/unknown.png" alt="Forms Logo" width={24} height={24} style={{ clipPath: 'circle(50%)', marginRight: '8px' }} />
                                                        <Text fontSize='24px' color={colorMode === 'dark' ? '#060607' : 'white'} textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap'>{form.data.forms[0]?.modal.title}</Text>
                                                    </Box>
                                                    <Box display='flex' p='4px' cursor='pointer' onClick={onClose}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#b9bbbe" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>
                                                    </Box>
                                                </Box>
                                                <Box>
                                                    {form.data.forms[0]?.modal.components.map(actionRow => (
                                                        <Box key={Math.random()} m='0 1em 1em'>
                                                            <Text textTransform='uppercase' fontFamily='Sofia Sans' fontWeight='extrabold' fontSize='14px' mb='8px' color={colorMode === 'dark' ? '#4f5660' : '#b9bbbe'}>
                                                                {actionRow.components[0]?.label}
                                                                {actionRow.components[0]?.required && <span style={{ color: '#ed4245', paddingLeft: '4px' }}>*</span>}
                                                            </Text>
                                                            <Box as={actionRow.components[0]?.style == 1 ? 'input' : 'textarea'} bg={colorMode === 'dark' ? '#e3e5e8' : '#202225'} fontSize='16px' resize='none' border='0px' _focus={{ border: '0px' }} placeholder={actionRow.components[0]?.placeholder} defaultValue={actionRow.components[0]?.value} />
                                                        </Box>
                                                    ))}
                                                </Box>
                                                <Box bg={colorMode === 'dark' ? '#f2f3f5' : '#2f3136'} p='16px' display='flex' justifyContent='flex-end' alignItems='center'>
                                                    <Button onClick={onClose} variant='link' color={colorMode === 'dark' ? '#747f8d' : 'white'} border='0px' _focus={{ border: '0px' }} >Cancel</Button>
                                                    <Button onClick={onClose} variant='primary' border='0px' _focus={{ border: '0px' }}>Submit</Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </ModalContent>
                                </Modal>
                            </Box>
                        </Box>
                    );
                })}
            </Grid>
        </>
    );
}

// export const getServerSideProps: GetServerSideProps<TemplateData> = async function (ctx) {
//     const REST = new Api(process.env.APP_URI as string);
//     const data = await REST.getForms();

//     if (data.hasError()) return {
//         props: {
//             templates: null,
//             error: data.message
//         }
//     };

//     return {
//         props: {
//             templates: data.data
//         }
//     };
// };
