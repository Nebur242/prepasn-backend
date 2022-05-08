import { Modal } from "antd";
import { useState } from "react";
import ContentSectionWrapper from "../../../components/content-section-wrapper"
import AppDocuments from "../../../components/documents"
import AppUploadDocuments from "../../../components/uploadFiles";
import { useFindAllDocumentsQuery } from "../../../store/features/documents"

const MediaLibrary = () => {

    const { isLoading, data = [], error } = useFindAllDocumentsQuery();
    const [isVisible, setIsVisible] = useState(false);

    const openModal = () => setIsVisible(true);

    return (
        <ContentSectionWrapper
            title="Media Library"
            description={`${data.length} assets`}
            createButtonText="Add new assets"
            onCreate={openModal}
            style={{
                padding: "2%",
            }}
        >
            <AppDocuments documents={data} loading={isLoading} error={error} />
            <Modal
                width="50vw"
                footer={null}
                visible={isVisible}
                onCancel={() => setIsVisible(false)}
            >
                <AppUploadDocuments />
            </Modal>
        </ContentSectionWrapper>
    )
}

export default MediaLibrary