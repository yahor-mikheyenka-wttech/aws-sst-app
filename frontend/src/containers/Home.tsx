import React, { useState, useEffect, useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { API } from 'aws-amplify';
import { AppContext } from '../lib/appContext';
import onError from '../lib/onError';
import { BsPencilSquare } from 'react-icons/bs';
import { LinkContainer } from 'react-router-bootstrap';
import './Home.css';

interface Notes {
	noteId: string;
	content: string;
	createdAt: string;
}

export default function Home() {
	const [notes, setNotes] = useState([]);
	const { isAuthenticated } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const onLoad = async () => {
			if (!isAuthenticated) {
				return;
			}

			try {
				const notes = await loadNotes();
				setNotes(notes);
			} catch (e) {
				onError(e);
			}

			setIsLoading(false);
		};

		onLoad();
	}, [isAuthenticated]);

	const loadNotes = () => {
		return API.get('notes', '/notes', '');
	};

	const renderNotesList = (notes: Notes[]) => {
		return (
			<>
				<LinkContainer to="/notes/new">
					<ListGroup.Item
						action
						className="py-3 text-nowrap text-truncate"
					>
						<BsPencilSquare size={17} />
						<span className="ml-2 font-weight-bold">
							Create a new note
						</span>
					</ListGroup.Item>
				</LinkContainer>
				{notes.map(({ noteId, content, createdAt }) => (
					<LinkContainer key={noteId} to={`/notes/${noteId}`}>
						<ListGroup.Item action>
							<span className="font-weight-bold">
								{content.trim().split('\n')[0]}
							</span>
							<br />
							<span className="text-muted">
								Created: {new Date(createdAt).toLocaleString()}
							</span>
						</ListGroup.Item>
					</LinkContainer>
				))}
			</>
		);
	};

	function renderLander() {
		return (
			<div className="lander">
				<h1>Scratch</h1>
				<p className="text-muted">A simple note taking app</p>
			</div>
		);
	}

	function renderNotes() {
		return (
			<div className="notes">
				<h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
				<ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
			</div>
		);
	}

	return (
		<div className="Home">
			{isAuthenticated ? renderNotes() : renderLander()}
		</div>
	);
}
