import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Blog(props) {
	const { blog } = props;

	return (
		<Card>
			<Link to={`/blog/${blog.slug}`}>
				<img src={blog.image} className="card-img-top" alt={blog.name} />
			</Link>
			<Card.Body>
				<Link to={`/blog/${blog.slug}`}>
					<Card.Title>{blog.name}</Card.Title>
				</Link>
				<Card.Text>{blog.description}</Card.Text>
				<Card.Text>{blog.text}</Card.Text>
			</Card.Body>
		</Card>
	);
}
export default Blog;
