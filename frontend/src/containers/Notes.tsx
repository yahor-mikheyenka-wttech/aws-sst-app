import React, { useRef, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { API, Storage } from 'aws-amplify';
import Form from 'react-bootstrap/Form';
import LoaderButton from '../components/LoaderButton';
import config from '../config';
import './Notes.css';
import onError from '../lib/onError';
import s3upload from '../lib/s3Upload';

interface ParamTypes {
	id: string;
}

export default function Notes() {
	const file: any = useRef(null);
	const { id } = useParams<ParamTypes>();
	const history = useHistory();
	const [note, setNote] = useState<any>(null);
	const [content, setContent] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		function loadNote() {
			return API.get('notes', `/notes/${id}`, '');
		}

		async function onLoad() {
			try {
				const note = await loadNote();
				const { content, attachment } = note;

				if (attachment) {
					note.attachmentURL = await Storage.vault.get(attachment);
				}

				setContent(content);
				setNote(note);
			} catch (e) {
				onError(e);
			}
		}

		onLoad();
	}, [id]);

	const validateForm = () => {
		return content.length > 0;
	};

	const formatFilename = (str: string) => {
		return str.replace(/^\w+-/, '');
	};

	const handleFileChange = (event: any) => {
		file.current = event.target.files[0];
	};

	const saveNote = (note: any) => {
		return API.put('notes', `/notes/${id}`, {
			body: note
		});
	};

	const handleSubmit = async (event: any) => {
		let attachment;

		event.preventDefault();

		if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
			alert(
				`Please pick a file smaller than ${
					config.MAX_ATTACHMENT_SIZE / 1000000
				} MB.`
			);
			return;
		}

		setIsLoading(true);

		try {
			if (file.current) {
				attachment = await s3upload(file.current);
			}

			await saveNote({
				content,
				attachment: attachment || note.attachment
			});
			history.push('/');
		} catch (e) {
			onError(e);
			setIsLoading(false);
		}
	};

	const deleteNote = () => {
		return API.del('notes', `/notes/${id}`, '');
	};

	const handleDelete = async (event: any) => {
		event.preventDefault();

		const confirmed = window.confirm(
			'Are you sure you want to delete this note?'
		);

		if (!confirmed) {
			return;
		}

		setIsDeleting(true);

		try {
			await deleteNote();
			history.push('/');
		} catch (e) {
			onError(e);
			setIsDeleting(false);
		}
	};

	return (
		<div className="Notes">
			{note && (
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="content">
						<Form.Control
							as="textarea"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="file">
						<Form.Label>Attachment</Form.Label>
						{note.attachment && (
							<p>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={note.attachmentURL}
								>
									{formatFilename(note.attachment)}
								</a>
							</p>
						)}
						<Form.Control onChange={handleFileChange} type="file" />
					</Form.Group>
					<LoaderButton
						block
						size="lg"
						type="submit"
						isLoading={isLoading}
						disabled={!validateForm()}
					>
						Save
					</LoaderButton>
					<LoaderButton
						block
						size="lg"
						variant="danger"
						isLoading={isDeleting}
						onClick={handleDelete}
						disabled={false}
					>
						Delete
					</LoaderButton>
				</Form>
			)}
		</div>
	);
}
