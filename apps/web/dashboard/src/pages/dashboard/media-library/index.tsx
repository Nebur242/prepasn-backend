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
            title="Grades"
            description="All grades"
            createButtonText="Create a new grade"
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