import React from 'react'
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap'
/* Styles */
const iconStyles = {
  WebkitTransform: 'rotateY(180deg)',
        transform: 'rotateY(180deg)'
}

const SearchInput = ({
  className,
  searchId,
  submitId,
  searchInput,
  searchUpdate,
  onSearch
}) => {
  return (
    <Container className={className}>
      <Row>
        <Col xs={12} sm={12} md={8} lg={10} xl={10}>
          <InputGroup size="lg">
            <InputGroup.Prepend>
              <InputGroup.Text style={iconStyles}>
                &#8981;
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Search..."
              defaultValue={searchInput}
              onChange={(e) => searchUpdate(e.target.value)}
              data-testid={searchId}
              aria-label="search"
              aria-describedby="search"
            />
          </InputGroup>
        </Col>
        <Col className="text-right" xs={12} sm={12} md={4} lg={2} xl={2}>
          <Button 
            data-testid={submitId}
            disabled={!searchInput}
            variant="light"
            size="lg"
            onClick={onSearch}>
              Submit
          </Button>
        </Col>
      </Row>
    </Container>)
}

export default SearchInput