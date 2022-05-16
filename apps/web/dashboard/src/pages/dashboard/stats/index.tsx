import { Card, Col, Row } from "antd"

const Statistics = () => {
    return (
        <Row gutter={[0, 10]}>
            <Col span={24}>
                <Row gutter={[10, 10]}>
                    {
                        [...new Array(4)].map((_, index) => (
                            <Col key={index} span={6}>
                                <Card>
                                    hello
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Col>
            <Col span={24}>hello</Col>
        </Row>
    )
}

export default Statistics