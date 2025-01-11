interface IconOptions {
  size?: number;
}

export function MentionIcon({ size = 24 }: IconOptions) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30.0053 5.27475C16.5566 5.27475 5.61523 16.4003 5.61523 30.0755C5.61523 43.7531 16.5566 54.8762 30.0053 54.8762C34.9785 54.8762 39.7443 53.3832 43.7906 50.5584L41.0321 46.4712C37.798 48.7231 33.9882 49.916 30.0053 49.916C19.2469 49.916 10.4933 41.0151 10.4933 30.0755C10.4933 19.1359 19.2469 10.2349 30.0053 10.2349C40.7638 10.2349 49.5174 19.1359 49.5174 30.0755V32.0149C49.5174 35.4572 48.0589 37.5157 45.615 37.5157L45.6101 37.5603C45.4638 37.5281 45.3052 37.5157 45.1491 37.5157H44.6394C43.2662 37.5157 41.2248 35.487 41.2248 34.1205V30.0755C41.2248 23.786 36.1931 18.6671 30.0053 18.6671C23.8176 18.6671 18.7859 23.7835 18.7859 30.0755C18.7859 36.3674 23.8176 41.4838 30.0053 41.4838C33.0151 41.4838 35.737 40.2586 37.7541 38.2919C39.337 40.6629 42.0296 42.4758 44.6394 42.4758L44.6443 42.4287C44.7955 42.4609 44.954 42.4758 45.115 42.4758H45.615C50.8637 42.4758 54.3954 38.2746 54.3954 32.0149V30.0755C54.3954 16.4003 43.454 5.27475 30.0053 5.27475ZM30.0053 36.5212C26.5078 36.5212 23.6639 33.6294 23.6639 30.073C23.6639 26.5166 26.5078 23.6248 30.0053 23.6248C33.5029 23.6248 36.3468 26.5166 36.3468 30.073C36.3468 33.6294 33.5029 36.5212 30.0053 36.5212Z" fill="#ABABAB" />
    </svg>
  );
}

export function DeleteIcon({ size = 24 }: IconOptions) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.02116 13.0858V15.3775H19.4795V13.0858H8.02116ZM13.7503 2.77332C7.42533 2.77332 2.29199 7.90665 2.29199 14.2316C2.29199 20.5566 7.42533 25.69 13.7503 25.69C20.0753 25.69 25.2087 20.5566 25.2087 14.2316C25.2087 7.90665 20.0753 2.77332 13.7503 2.77332ZM13.7503 23.3983C8.6972 23.3983 4.58366 19.2848 4.58366 14.2316C4.58366 9.17852 8.6972 5.06498 13.7503 5.06498C18.8035 5.06498 22.917 9.17852 22.917 14.2316C22.917 19.2848 18.8035 23.3983 13.7503 23.3983Z" fill="#ababab" />
    </svg>
  );
}

export function UpdateIcon({ size = 24 }: IconOptions) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.2239 7.76095C18.5624 6.09949 16.2822 5.06824 13.7499 5.06824C8.68535 5.06824 4.59473 9.17032 4.59473 14.2349C4.59473 19.2995 8.68535 23.4016 13.7499 23.4016C18.0239 23.4016 21.5874 20.4797 22.6072 16.5266H20.2239C19.2843 19.1964 16.7406 21.1099 13.7499 21.1099C9.95723 21.1099 6.87494 18.0276 6.87494 14.2349C6.87494 10.4422 9.95723 7.3599 13.7499 7.3599C15.652 7.3599 17.3479 8.15053 18.5854 9.39949L14.8958 13.0891H22.9166V5.06824L20.2239 7.76095Z" fill="#ababab" />
    </svg>
  );
}

export function UpdateChannelIcon({ size = 24 }: IconOptions) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1531_259)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M40 26.1153V22.9833H10V27.9833H35.32C36.7785 27.1739 38.3483 26.5415 40 26.1153ZM29.3936 32.9833H10V37.9833H26.4567C27.1924 36.1691 28.1867 34.4872 29.3936 32.9833ZM25.1551 42.9833H10V47.9833H25.1553C25.0528 47.1641 25 46.3297 25 45.4833C25 44.6366 25.0527 43.8023 25.1551 42.9833ZM10 12.9833H50V17.9833H10V12.9833Z" fill="#ABABAB" />
        <path d="M50.2241 37.7609C48.5627 36.0995 46.2825 35.0682 43.7502 35.0682C38.6856 35.0682 34.595 39.1703 34.595 44.2349C34.595 49.2995 38.6856 53.4016 43.7502 53.4016C48.0241 53.4016 51.5877 50.4797 52.6075 46.5266H50.2241C49.2846 49.1964 46.7408 51.1099 43.7502 51.1099C39.9575 51.1099 36.8752 48.0276 36.8752 44.2349C36.8752 40.4422 39.9575 37.3599 43.7502 37.3599C45.6523 37.3599 47.3481 38.1505 48.5856 39.3995L44.896 43.0891H52.9168V35.0682L50.2241 37.7609Z" fill="#ababab" />
      </g>
      <defs>
        <clipPath id="clip0_1531_259">
          <rect width="60" height="60" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function DeleteMessageIcon({ size = 24 }: IconOptions) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1531_261)">
        <path d="M11.9973 7.98328C9.51331 7.98328 7.49536 9.99898 7.49536 12.4852V39.4823C7.49536 41.9663 9.51331 43.9843 11.9973 43.9843H18.7454V52.9833L25.1077 46.621C25.0664 46.2232 25.0371 45.8242 25.0198 45.4247C25.0198 40.1204 27.1269 35.0333 30.8776 31.2825C34.6284 27.5318 39.7154 25.4247 45.0198 25.4247C47.5818 25.4264 50.1197 25.9204 52.4954 26.8798V12.4852C52.4954 9.99898 50.4797 7.98328 47.9934 7.98328H11.9973Z" fill="#ABABAB" />
        <path d="M38.0219 43.0858V45.3775H49.4802V43.0858H38.0219ZM43.7511 32.7733C37.4261 32.7733 32.2927 37.9066 32.2927 44.2316C32.2927 50.5566 37.4261 55.69 43.7511 55.69C50.0761 55.69 55.2094 50.5566 55.2094 44.2316C55.2094 37.9066 50.0761 32.7733 43.7511 32.7733ZM43.7511 53.3983C38.6979 53.3983 34.5844 49.2848 34.5844 44.2316C34.5844 39.1785 38.6979 35.065 43.7511 35.065C48.8042 35.065 52.9177 39.1785 52.9177 44.2316C52.9177 49.2848 48.8042 53.3983 43.7511 53.3983Z" fill="#ababab" />
      </g>
      <defs>
        <clipPath id="clip0_1531_261">
          <rect width="60" height="60" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function DeleteChannelIcon({ size = 24 }: IconOptions) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1531_275)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M39.9998 26.1153V22.9833H9.99976V27.9833H35.3197C36.7783 27.1739 38.3481 26.5415 39.9998 26.1153ZM29.3934 32.9833H9.99976V37.9833H26.4565C27.1922 36.1691 28.1865 34.4872 29.3934 32.9833ZM25.1549 42.9833H9.99976V47.9833H25.155C25.0526 47.1641 24.9998 46.3297 24.9998 45.4833C24.9998 44.6366 25.0525 43.8023 25.1549 42.9833ZM9.99976 12.9833H49.9998V17.9833H9.99976V12.9833Z" fill="#ABABAB" />
        <path d="M38.0212 43.0858V45.3775H49.4795V43.0858H38.0212ZM43.7503 32.7733C37.4253 32.7733 32.292 37.9066 32.292 44.2316C32.292 50.5566 37.4253 55.69 43.7503 55.69C50.0753 55.69 55.2087 50.5566 55.2087 44.2316C55.2087 37.9066 50.0753 32.7733 43.7503 32.7733ZM43.7503 53.3983C38.6972 53.3983 34.5837 49.2848 34.5837 44.2316C34.5837 39.1785 38.6972 35.065 43.7503 35.065C48.8035 35.065 52.917 39.1785 52.917 44.2316C52.917 49.2848 48.8035 53.3983 43.7503 53.3983Z" fill="#ababab" />
      </g>
      <defs>
        <clipPath id="clip0_1531_275">
          <rect width="60" height="60" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function SendIcon({ size = 24 }: IconOptions) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M31.0268 32.3299L7.49989 34.6045L1.30886 54.4046C0.939715 55.5753 1.30183 56.8548 2.23343 57.6566C3.16151 58.458 4.4799 58.6267 5.58386 58.089L57.144 33.1211C58.1531 32.6289 58.7929 31.6058 58.7929 30.4843C58.7929 29.3629 58.1528 28.3398 57.144 27.8476L5.61896 2.86181C4.51504 2.32392 3.1967 2.49267 2.26853 3.29424C1.33685 4.09581 0.974778 5.37198 1.34396 6.54269L7.53495 26.3427L31.016 28.6208C31.9652 28.7157 32.6894 29.5138 32.6894 30.4665C32.6894 31.4193 31.9652 32.2173 31.016 32.3122L31.0268 32.3299Z" fill="#ababab" />
    </svg>
  );
}

export function BanIcon({ size = 24 }: IconOptions) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1734_981)">
        <path d="M6 60L0 54L20.4 33.6L26.4 39.6L6 60ZM38.4 48H44.4L60 32.4V26.4L33.6 0H27.6L12 15.6V21.6L38.4 48ZM51.6 13.2C51.8364 13.4364 52.117 13.6239 52.4258 13.7518C52.7347 13.8797 53.0657 13.9456 53.4 13.9456C53.7343 13.9456 54.0653 13.8797 54.3742 13.7518C54.683 13.6239 54.9636 13.4364 55.2 13.2C55.4364 12.9636 55.6239 12.683 55.7518 12.3742C55.8797 12.0653 55.9456 11.7343 55.9456 11.4C55.9456 11.0657 55.8797 10.7347 55.7518 10.4258C55.6239 10.117 55.4364 9.83638 55.2 9.6L50.4 4.8C49.9226 4.32261 49.2751 4.05442 48.6 4.05442C47.9249 4.05442 47.2774 4.32261 46.8 4.8C46.3226 5.27739 46.0544 5.92487 46.0544 6.6C46.0544 7.27513 46.3226 7.92261 46.8 8.4L51.6 13.2Z" fill="#ababab" />
      </g>
      <defs>
        <clipPath id="clip0_1734_981">
          <rect width="60" height="60" fill="white" />
        </clipPath>
      </defs>
    </svg>

  );
}

export function KickIcon({ size = 24 }: IconOptions) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.3333 30C26.2802 30 29.1063 28.8147 31.1901 26.705C33.2738 24.5952 34.4444 21.7337 34.4444 18.75C34.4444 15.7663 33.2738 12.9048 31.1901 10.795C29.1063 8.68526 26.2802 7.5 23.3333 7.5C20.3865 7.5 17.5603 8.68526 15.4766 10.795C13.3929 12.9048 12.2222 15.7663 12.2222 18.75C12.2222 21.7337 13.3929 24.5952 15.4766 26.705C17.5603 28.8147 20.3865 30 23.3333 30ZM46.6667 52.5V45.75C38.8889 33.375 7.77778 33.375 0 45.75V52.5H46.6667ZM44.4444 34.5L42.2222 32.25L48.8889 25.5L42.2222 18.75L44.4444 16.5L51.1111 23.25L57.7778 16.5L60 18.75L53.3333 25.5L60 32.25L57.7778 34.5L51.1111 27.75L44.4444 34.5Z" fill="#ababab" />
    </svg>
  );
}

export function LockIcon({ size = 24 }: IconOptions) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M39 27.0007H21V24.0007C21 19.0387 25.038 15.0007 30 15.0007C34.962 15.0007 39 19.0387 39 24.0007V27.0007ZM27 45.0007H33V33.0007H27V45.0007ZM30 9.00073C21.714 9.00073 15 15.7147 15 24.0007V27.0007V39.0007V45.0007C15 48.3127 17.688 51.0007 21 51.0007H39C42.312 51.0007 45 48.3127 45 45.0007V39.0007V27.0007V24.0007C45 15.7147 38.286 9.00073 30 9.00073Z" fill="#ABABAB" />
    </svg>
  );
}

export function TimeoutIcon({ size = 24 }: IconOptions) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M37.0745 40.6L28.2247 31.775C27.9929 31.5413 27.8095 31.2642 27.6851 30.9597C27.5607 30.6553 27.4977 30.329 27.4996 30V15H32.4995V28.9749L40.5995 37.075L37.0745 40.6Z" fill="#ABABAB" />
      <path d="M38.2748 10L49.9995 21.725V38.2752L38.2748 50H21.7244L9.99951 38.2752V21.725L21.7244 10H38.2748ZM39.3245 5H20.6746C20.0126 5.00921 19.3787 5.26811 18.8997 5.72495L5.72461 18.9C5.26777 19.3791 5.00872 20.0131 4.99951 20.675V39.325C5.00872 39.9867 5.26777 40.6208 5.72461 41.0998L18.8997 54.275C19.3787 54.7317 20.0126 54.9907 20.6746 55H39.3245C39.9863 54.9907 40.6203 54.7317 41.0993 54.275L54.2745 41.0998C54.7313 40.6208 54.9903 39.9867 54.9995 39.325V20.675C54.9903 20.0131 54.7313 19.3791 54.2745 18.9L41.0993 5.72495C40.6203 5.26811 39.9863 5.00921 39.3245 5Z" fill="#ABABAB" />
    </svg>
  );
}

export function RoleIcon({ size = 24 }: IconOptions) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M51.8178 15.8242L31.1201 4.32547C30.4233 3.93912 29.5815 3.93912 28.8847 4.32547L8.18695 15.8242C7.45793 16.229 7.00488 16.9971 7.00488 17.8319C7.00488 19.4279 7.26706 56.9276 30.0024 56.9276C52.7377 56.9276 52.9999 19.4279 52.9999 17.8319C52.9999 16.9971 52.5468 16.229 51.8178 15.8242ZM30.0024 17.8319C33.1783 17.8319 35.7518 20.4053 35.7518 23.5812C35.7518 26.7572 33.1783 29.3306 30.0024 29.3306C26.8264 29.3306 24.253 26.7572 24.253 23.5812C24.253 20.4053 26.8264 17.8319 30.0024 17.8319ZM21.3783 40.8316C21.3783 35.5399 24.7106 32.2076 30.0024 32.2076C35.2941 32.2076 38.6264 35.5399 38.6264 40.8316H21.3783Z" fill="#ABABAB" />
    </svg>
  );
}

export function ThreadIcon({ size = 24 }: IconOptions) {
  return (
    <svg x="0" y="0" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24"><path d="M12 2.81a1 1 0 0 1 0-1.41l.36-.36a1 1 0 0 1 1.41 0l9.2 9.2a1 1 0 0 1 0 1.4l-.7.7a1 1 0 0 1-1.3.13l-9.54-6.72a1 1 0 0 1-.08-1.58l1-1L12 2.8ZM12 21.2a1 1 0 0 1 0 1.41l-.35.35a1 1 0 0 1-1.41 0l-9.2-9.19a1 1 0 0 1 0-1.41l.7-.7a1 1 0 0 1 1.3-.12l9.54 6.72a1 1 0 0 1 .07 1.58l-1 1 .35.36ZM15.66 16.8a1 1 0 0 1-1.38.28l-8.49-5.66A1 1 0 1 1 6.9 9.76l8.49 5.65a1 1 0 0 1 .27 1.39ZM17.1 14.25a1 1 0 1 0 1.11-1.66L9.73 6.93a1 1 0 0 0-1.11 1.66l8.49 5.66Z" fill="currentColor"></path></svg>
  );
}

export function ForwardIcon({ size = 24 }: IconOptions) {
  return (
    <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M21.7 7.3a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4L18.58 9H13a7 7 0 0 0-7 7v4a1 1 0 1 1-2 0v-4a9 9 0 0 1 9-9h5.59l-3.3-3.3a1 1 0 0 1 1.42-1.4l5 5Z"></path></svg>
  );
}

export function ReplyIcon({ size = 24 }: IconOptions) {
  return (
    <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M2.3 7.3a1 1 0 0 0 0 1.4l5 5a1 1 0 0 0 1.4-1.4L5.42 9H11a7 7 0 0 1 7 7v4a1 1 0 1 0 2 0v-4a9 9 0 0 0-9-9H5.41l3.3-3.3a1 1 0 0 0-1.42-1.4l-5 5Z"></path></svg>
  );
}

export function ChannelIcon({ size = 24 }: IconOptions) {
  return (
    <svg
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
}

export function InfoIcon({ size = 24 }: IconOptions) {
  return (
    <svg
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" fill="transparent"></circle>
      <path
        fill="color-mix(in oklab, hsl(199.524 calc(1 * 100%) 49.412% / 1) 100%, var(--theme-text-color, black) var(--theme-text-color-amount, 0%))"
        fill-rule="evenodd"
        d="M23 12a11 11 0 1 1-22 0 11 11 0 0 1 22 0Zm-9.5-4.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm-.77 3.96a1 1 0 1 0-1.96-.42l-1.04 4.86a2.77 2.77 0 0 0 4.31 2.83l.24-.17a1 1 0 1 0-1.16-1.62l-.24.17a.77.77 0 0 1-1.2-.79l1.05-4.86Z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
}