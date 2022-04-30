import { FC } from 'react'
import {
    QuestionOutlined,
    DashboardOutlined,
    SmileOutlined,
    FormOutlined,
    TabletOutlined,
    ProfileOutlined,
    CheckCircleOutlined,
    WarningOutlined,
    UserOutlined,
    HighlightOutlined,
    TableOutlined,
    CloseCircleOutlined,
    HomeOutlined,
    InboxOutlined,
    SearchOutlined,
    ArrowLeftOutlined,
    PlusOutlined,
    CheckOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';

export interface IIcons {
    type: string | null | undefined;
    className?: string;
}

const Icon: FC<IIcons> = ({ type, ...rest }): JSX.Element | null => {
    if (!type) return null;
    const getIcon = (type: string) => ({
        QuestionOutlined: <QuestionOutlined {...rest} />,
        DashboardOutlined: <DashboardOutlined {...rest} />,
        SmileOutlined: <SmileOutlined {...rest} />,
        FormOutlined: <FormOutlined {...rest} />,
        TabletOutlined: <TabletOutlined {...rest} />,
        ProfileOutlined: <ProfileOutlined {...rest} />,
        CheckCircleOutlined: <CheckCircleOutlined {...rest} />,
        WarningOutlined: <WarningOutlined {...rest} />,
        UserOutlined: <UserOutlined {...rest} />,
        HighlightOutlined: <HighlightOutlined {...rest} />,
        CloseCircleOutlined: <CloseCircleOutlined {...rest} />,
        TableOutlined: <TableOutlined {...rest} />,
        HomeOutlined: < HomeOutlined {...rest} />,
        InboxOutlined: <InboxOutlined {...rest} />,
        SearchOutlined: <SearchOutlined {...rest} />,
        ArrowLeftOutlined: <ArrowLeftOutlined {...rest} />,
        PlusOutlined: <PlusOutlined {...rest} />,
        CheckOutlined: <CheckOutlined {...rest} />,
        EditOutlined: <EditOutlined />,
        DeleteOutlined: <DeleteOutlined />,
        default: null
    }[type]);

    return getIcon(type) || <QuestionOutlined {...rest} />;
}

export default Icon;