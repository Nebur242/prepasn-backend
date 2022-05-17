import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
}
const ContentScroll: FC<Props> = ({ children }) => {
    return (
        <div style={{
            maxHeight: 'calc( 100vh - 94px )',
            overflowY: 'scroll',
            paddingBottom: '100px',
        }}>{children}</div>
    )
}

export default ContentScroll;